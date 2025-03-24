import { Schema, Document, Types } from 'mongoose';
export declare const CategorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
}>> & import("mongoose").FlatRecord<{
    name: string;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Category extends Document {
    _id: Types.ObjectId;
    name: string;
}
