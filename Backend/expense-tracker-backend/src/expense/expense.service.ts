
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private expenseModel: Model<Expense>,
    private readonly categoryService: CategoryService
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    
    const category = await this.categoryService.findOrCreate(
      createExpenseDto.category
    );

    const createdExpense = new this.expenseModel({
      ...createExpenseDto,
      category: category._id
    });
   await createdExpense.save();

 
    
   return createdExpense.populate('category');
  }

  async findAll(options: { page: number; limit: number; category?: string }): Promise<Expense[]> {
    const { page, limit, category } = options;
    const filter = category ? { category } : {};
    return await this.expenseModel.find(filter)
    .populate({
      path: 'category',
      select: 'name',
      options: { retainNullValues: true } // Keep null values
    })  
      .sort({ date: -1 })
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
 
    const updatePayload: any = { ...updateExpenseDto };
  
    if (updatePayload.category) {
      const category = await this.categoryService.findOrCreate(updatePayload.category);
      updatePayload.category = category._id; 
    }
  
    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(id, updatePayload, { 
        new: true,
        runValidators: true 
      })
      .populate('category');
  
    if (!updatedExpense) {
      throw new NotFoundException(`Expense #${id} not found`);
    }
    return updatedExpense;
  }

  async remove(id: string): Promise<any> {
    return await this.expenseModel.findByIdAndDelete(id);
  }
}

