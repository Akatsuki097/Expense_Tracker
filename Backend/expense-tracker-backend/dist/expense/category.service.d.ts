import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { Expense } from './schema/expense.schema';
export declare class CategoryService {
    private categoryModel;
    private expenseModel;
    constructor(categoryModel: Model<Category>, expenseModel: Model<Expense>);
    findOrCreate(name: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    create(name: string): Promise<Category>;
    update(id: string, newName: string): Promise<Category>;
    delete(id: string): Promise<Category>;
}
