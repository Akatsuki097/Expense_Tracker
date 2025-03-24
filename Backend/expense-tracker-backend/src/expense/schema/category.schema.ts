import { Schema, Document, Types } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export interface Category extends Document {
  _id: Types.ObjectId; // Explicitly type _id
  name: string;
}

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Category extends Document {
//   @Prop({ type: Types.ObjectId })
//   declare _id: Types.ObjectId;
  
//   @Prop({ required: true, unique: true })
//   name: string;

//   @Prop({ type: [{ type: Types.ObjectId, ref: 'Expense' }] })
//   expenses: Types.ObjectId[];
// }

//export const CategorySchema = SchemaFactory.createForClass(Category);