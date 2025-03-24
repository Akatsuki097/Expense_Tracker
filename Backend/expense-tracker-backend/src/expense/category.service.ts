import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { Expense } from './schema/expense.schema'; 

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('Expense') private expenseModel: Model<Expense>
  ) {}

  async findOrCreate(name: string): Promise<Category> {
    let category = await this.categoryModel.findOne({ name });
    if (!category) {
      category = await this.categoryModel.create({ name });
      await category.save();
    }
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

    async create(name: string): Promise<Category> {
    const existing = await this.categoryModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });

    if (existing) {
      throw new Error('Category already exists');
    }

    const newCategory = new this.categoryModel({ name });
    return newCategory.save();
  }

  async update(id: string, newName: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true }
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async delete(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }

  await this.expenseModel.updateMany(
    { category: id },
    { $unset: { category: "" } } 
  );

    return category;
  }
}
