export declare class CreateExpenseDto {
    readonly amount: number;
    readonly description?: string;
    readonly date?: Date;
    category: string;
    readonly recurring?: boolean;
    readonly recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
