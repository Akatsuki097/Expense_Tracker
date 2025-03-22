import { Model } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseService {
    private expenseModel;
    constructor(expenseModel: Model<Expense>);
    create(createExpenseDto: CreateExpenseDto): Promise<Expense>;
    findAll(options: {
        page: number;
        limit: number;
        category?: string;
    }): Promise<Expense[]>;
    findOne(id: string): Promise<Expense>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense>;
    remove(id: string): Promise<any>;
}
