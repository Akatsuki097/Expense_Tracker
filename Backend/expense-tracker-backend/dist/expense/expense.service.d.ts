import { Model } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CategoryService } from './category.service';
export declare class ExpenseService {
    private expenseModel;
    private readonly categoryService;
    constructor(expenseModel: Model<Expense>, categoryService: CategoryService);
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
