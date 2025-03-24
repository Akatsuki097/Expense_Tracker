import { Schema, Document, Types } from 'mongoose';
import { Category } from './category.schema';

export const ExpenseSchema = new Schema({
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref : 'Category', required: true },
  recurring: { type: Boolean, default: false },
  recurrenceInterval: { type: String, enum: ['daily', 'weekly', 'monthly'] },
});

export interface Expense extends Document {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  category: Types.ObjectId | Category;
  recurring?: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}
