// expense/schemas/expense.schema.ts
import { Schema, Document } from 'mongoose';

export const ExpenseSchema = new Schema({
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  recurring: { type: Boolean, default: false },
  recurrenceInterval: { type: String, enum: ['daily', 'weekly', 'monthly'] },
});

export interface Expense extends Document {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  category: string;
  recurring?: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
