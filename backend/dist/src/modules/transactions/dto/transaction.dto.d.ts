export declare class TransferDto {
    senderAccountId: string;
    receiverAccountNumber: string;
    amount: number;
    description?: string;
    idempotencyKey: string;
}
