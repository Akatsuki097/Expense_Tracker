import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(createExpenseDto: CreateExpenseDto): Promise<import("./schema/expense.schema").Expense>;
    findAll(page?: number, limit?: number, category?: string): Promise<import("./schema/expense.schema").Expense[]>;
    findOne(id: string): Promise<import("./schema/expense.schema").Expense>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<import("./schema/expense.schema").Expense>;
    remove(id: string): Promise<any>;
}
