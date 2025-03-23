import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    findOrCreate(name: string): Promise<Category>;
    findAll(): Promise<Category[]>;
}
