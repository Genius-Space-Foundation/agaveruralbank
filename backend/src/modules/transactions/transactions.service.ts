import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TransferDto } from './dto/transaction.dto';
import { TransactionType, TransactionStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async transfer(userId: string, dto: TransferDto) {
    // 1. Check idempotency
    const existingTx = await this.prisma.transaction.findUnique({
      where: { idempotencyKey: dto.idempotencyKey },
    });
    if (existingTx) {
      return existingTx;
    }

    return this.prisma.$transaction(async (tx) => {
      // 2. Validate sender account and balance
      const senderAccount = await tx.account.findFirst({
        where: { id: dto.senderAccountId, userId },
      });

      if (!senderAccount) {
        throw new NotFoundException('Sender account not found');
      }

      if (senderAccount.balance.lessThan(dto.amount)) {
        throw new BadRequestException('Insufficient funds');
      }

      // 3. Validate receiver account
      const receiverAccount = await tx.account.findUnique({
        where: { accountNumber: dto.receiverAccountNumber },
      });

      if (!receiverAccount) {
        throw new NotFoundException('Receiver account not found');
      }

      if (senderAccount.id === receiverAccount.id) {
        throw new BadRequestException('Cannot transfer to the same account');
      }

      // 4. Record the transaction (Ledger Entry)
      const transaction = await tx.transaction.create({
        data: {
          reference: `TRF-${uuidv4().substring(0, 8).toUpperCase()}`,
          type: TransactionType.TRANSFER,
          amount: dto.amount,
          status: TransactionStatus.COMPLETED,
          description: dto.description || `Transfer to ${dto.receiverAccountNumber}`,
          idempotencyKey: dto.idempotencyKey,
          senderAccountId: senderAccount.id,
          receiverAccountId: receiverAccount.id,
        },
      });

      // 5. Update balances (Atomic)
      await tx.account.update({
        where: { id: senderAccount.id },
        data: { balance: { decrement: dto.amount } },
      });

      await tx.account.update({
        where: { id: receiverAccount.id },
        data: { balance: { increment: dto.amount } },
      });

      // 6. Audit Logging
      await tx.auditLog.create({
        data: {
          userId,
          action: 'TRANSFER_SUCCESS',
          resource: 'TRANSACTION',
          metadata: {
            transactionId: transaction.id,
            amount: dto.amount,
            sender: senderAccount.accountNumber,
            receiver: receiverAccount.accountNumber,
          },
        },
      });

      return transaction;
    });
  }

  async getHistory(userId: string, accountId: string) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { senderAccountId: accountId },
          { receiverAccountId: accountId },
        ],
        AND: [
          {
            OR: [
              { senderAccount: { userId } },
              { receiverAccount: { userId } },
            ],
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        senderAccount: { select: { accountNumber: true } },
        receiverAccount: { select: { accountNumber: true } },
      },
    });
  }
}
