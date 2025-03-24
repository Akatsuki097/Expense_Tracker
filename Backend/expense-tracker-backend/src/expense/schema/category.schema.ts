import { Schema, Document, Types } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export interface Category extends Document {
  _id: Types.ObjectId; 
  name: string;
}

