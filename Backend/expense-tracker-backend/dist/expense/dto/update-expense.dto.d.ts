export declare class UpdateExpenseDto {
    amount?: number;
    description?: string;
    readonly date?: Date;
    category?: string;
    readonly recurring?: boolean;
    readonly recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
