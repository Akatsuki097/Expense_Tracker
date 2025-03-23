import { Schema, Document } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export interface Category extends Document {
  name: string;
}