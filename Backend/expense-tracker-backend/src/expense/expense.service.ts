// expense/expense.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(@InjectModel('Expense') private expenseModel: Model<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const createdExpense = new this.expenseModel(createExpenseDto);
    return await createdExpense.save();
  }

  async findAll(options: { page: number; limit: number; category?: string }): Promise<Expense[]> {
    const { page, limit, category } = options;
    const filter = category ? { category } : {};
    return await this.expenseModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new NotFoundException(`Expense #${id} not found`);
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const updatedExpense = await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true });
    if (!updatedExpense) {
      throw new NotFoundException(`Expense #${id} not found`);
    }
    return updatedExpense;
  }

  async remove(id: string): Promise<any> {
    return await this.expenseModel.findByIdAndDelete(id);
  }
}
