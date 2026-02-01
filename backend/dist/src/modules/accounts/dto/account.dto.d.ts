export declare enum AccountType {
    SAVINGS = "SAVINGS",
    CURRENT = "CURRENT",
    SUSU = "SUSU"
}
export declare class CreateAccountDto {
    type: AccountType;
    currency: string;
}
