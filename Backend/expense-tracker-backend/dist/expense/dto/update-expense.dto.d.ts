export declare class UpdateExpenseDto {
    readonly amount?: number;
    readonly description?: string;
    readonly date?: Date;
    readonly category?: string;
    readonly recurring?: boolean;
    readonly recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
