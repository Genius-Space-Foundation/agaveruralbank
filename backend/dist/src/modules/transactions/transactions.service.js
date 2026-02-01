"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async transfer(userId, dto) {
        const existingTx = await this.prisma.transaction.findUnique({
            where: { idempotencyKey: dto.idempotencyKey },
        });
        if (existingTx) {
            return existingTx;
        }
        return this.prisma.$transaction(async (tx) => {
            const senderAccount = await tx.account.findFirst({
                where: { id: dto.senderAccountId, userId },
            });
            if (!senderAccount) {
                throw new common_1.NotFoundException('Sender account not found');
            }
            if (senderAccount.balance.lessThan(dto.amount)) {
                throw new common_1.BadRequestException('Insufficient funds');
            }
            const receiverAccount = await tx.account.findUnique({
                where: { accountNumber: dto.receiverAccountNumber },
            });
            if (!receiverAccount) {
                throw new common_1.NotFoundException('Receiver account not found');
            }
            if (senderAccount.id === receiverAccount.id) {
                throw new common_1.BadRequestException('Cannot transfer to the same account');
            }
            const transaction = await tx.transaction.create({
                data: {
                    reference: `TRF-${(0, uuid_1.v4)().substring(0, 8).toUpperCase()}`,
                    type: client_1.TransactionType.TRANSFER,
                    amount: dto.amount,
                    status: client_1.TransactionStatus.COMPLETED,
                    description: dto.description || `Transfer to ${dto.receiverAccountNumber}`,
                    idempotencyKey: dto.idempotencyKey,
                    senderAccountId: senderAccount.id,
                    receiverAccountId: receiverAccount.id,
                },
            });
            await tx.account.update({
                where: { id: senderAccount.id },
                data: { balance: { decrement: dto.amount } },
            });
            await tx.account.update({
                where: { id: receiverAccount.id },
                data: { balance: { increment: dto.amount } },
            });
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
    async getHistory(userId, accountId) {
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
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map