// expense/schemas/expense.schema.ts
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

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';
// import { Category } from './category.schema';

// @Schema({ timestamps: true })
// export class Expense extends Document {
//   @Prop({ required: true })
//   amount: number;

//   @Prop()
//   description: string;

//   @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
//   category: Types.ObjectId;

//   @Prop({ default: Date.now })
//   date: Date;
// }

// export interface Expense extends Document {
//   _id: Types.ObjectId;
//   amount: number;
//   description: string;
//   category: Types.ObjectId ;
// }

// export const ExpenseSchema = SchemaFactory.createForClass(Expense);