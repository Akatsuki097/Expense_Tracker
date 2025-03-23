import { Schema, Document } from 'mongoose';
export declare const CategorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
}>> & import("mongoose").FlatRecord<{
    name: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface Category extends Document {
    name: string;
}
