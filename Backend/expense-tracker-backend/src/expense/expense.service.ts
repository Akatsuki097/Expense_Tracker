// expense/expense.service.ts
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
    // Auto-create category if needed
    // await this.categoryService.findOrCreate(createExpenseDto.category);
    
    const category = await this.categoryService.findOrCreate(
      createExpenseDto.category
    );

    const createdExpense = new this.expenseModel({
      ...createExpenseDto,
      category: category._id
    });
   await createdExpense.save();

  //  // Add expense to category's expenses array
  //  await this.categoryService.addExpenseToCategory(
  //   category._id,
  //   createdExpense._id
  //  );
    
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
    // Create a copy of the DTO
    const updatePayload: any = { ...updateExpenseDto };
  
    // Handle category conversion if present
    if (updatePayload.category) {
      const category = await this.categoryService.findOrCreate(updatePayload.category);
      updatePayload.category = category._id; // Use the ObjectID
    }
  
    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(id, updatePayload, { 
        new: true,
        runValidators: true // Ensure validations run
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

// @Injectable()
// export class ExpenseService {
//   constructor(
//     @InjectModel('Expense') private expenseModel: Model<Expense>,
//     private categoryService: CategoryService
//   ) {}

//   async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
//     const category = await this.categoryService.findOrCreate(createExpenseDto.category);
    
//     const expense = new this.expenseModel({
//       ...createExpenseDto,
//       category: category._id
//     });
    
//     await expense.save();
    
//     // // Add expense to category's expenses array
//     // await this.categoryService.addExpenseToCategory(category._id, expense._id);
    
//     return expense.populate('category');
//   }

//   async findAll(): Promise<Expense[]> {
//     return this.expenseModel.find().populate('category').exec();
//   }
// }
