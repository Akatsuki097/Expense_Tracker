import { Schema, Document, Types } from 'mongoose';
import { Category } from './category.schema';
export declare const ExpenseSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    amount: number;
    date: NativeDate;
    category: Types.ObjectId;
    recurring: boolean;
    description?: string | null | undefined;
    recurrenceInterval?: "daily" | "weekly" | "monthly" | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    amount: number;
    date: NativeDate;
    category: Types.ObjectId;
    recurring: boolean;
    description?: string | null | undefined;
    recurrenceInterval?: "daily" | "weekly" | "monthly" | null | undefined;
}>> & import("mongoose").FlatRecord<{
    amount: number;
    date: NativeDate;
    category: Types.ObjectId;
    recurring: boolean;
    description?: string | null | undefined;
    recurrenceInterval?: "daily" | "weekly" | "monthly" | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Expense extends Document {
    id: string;
    amount: number;
    description?: string;
    date: Date;
    category: Types.ObjectId | Category;
    recurring?: boolean;
    recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
