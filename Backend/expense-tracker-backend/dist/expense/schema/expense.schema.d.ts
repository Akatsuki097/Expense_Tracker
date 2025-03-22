import { Schema, Document } from 'mongoose';
export declare const ExpenseSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    amount: number;
    date: NativeDate;
    category: string;
    recurring: boolean;
    description?: string | null | undefined;
    recurrenceInterval?: "daily" | "weekly" | "monthly" | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    amount: number;
    date: NativeDate;
    category: string;
    recurring: boolean;
    description?: string | null | undefined;
    recurrenceInterval?: "daily" | "weekly" | "monthly" | null | undefined;
}>> & import("mongoose").FlatRecord<{
    amount: number;
    date: NativeDate;
    category: string;
    recurring: boolean;
    description?: string | null | undefined;
    recurrenceInterval?: "daily" | "weekly" | "monthly" | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface Expense extends Document {
    id: string;
    amount: number;
    description?: string;
    date: Date;
    category: string;
    recurring?: boolean;
    recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
