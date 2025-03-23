import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) {}

  async findOrCreate(name: string): Promise<Category> {
    let category = await this.categoryModel.findOne({ name });
    if (!category) {
      category = new this.categoryModel({ name });
      await category.save();
    }
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}