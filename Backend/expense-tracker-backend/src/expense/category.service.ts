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

     // Remove category reference from all linked expenses
  await this.expenseModel.updateMany(
    { category: id },
    { $unset: { category: "" } } // Or set to a default category
  );

    return category;
  }
}




// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Category } from './schema/category.schema';
// import { Expense } from './schema/expense.schema';

// @Injectable()
// export class CategoryService {
//   constructor(
//     @InjectModel('Category') private categoryModel: Model<Category>,
//   ) {}

//   async findAll(): Promise<Category[]> {
//     return await this.categoryModel.find().exec();
//   }

//   async findOrCreate(name: string): Promise<Category> {
//     let category = await this.categoryModel.findOne({ name });
//     if (!category) {
//       category = new this.categoryModel({ name });
//       await category.save();
//     }
//     return category;
//   }
//   async addExpenseToCategory(
//     categoryId: Types.ObjectId,
//     expenseId: Types.ObjectId
//   ): Promise<void> {
//     await this.categoryModel.findByIdAndUpdate(
//       categoryId,
//       { $push: { expenses: expenseId } },
//       { new: true }
//     );
//   }

//   async create(name: string): Promise<Category> {
//     const existing = await this.categoryModel.findOne({
//       name: { $regex: new RegExp(`^${name}$`, 'i') }
//     });

//     if (existing) {
//       throw new Error('Category already exists');
//     }

//     const newCategory = new this.categoryModel({ name });
//     return newCategory.save();
//   }

//   async update(id: string, newName: string): Promise<Category> {
//     const category = await this.categoryModel.findByIdAndUpdate(
//       id,
//       { name: newName },
//       { new: true }
//     );

//     if (!category) {
//       throw new NotFoundException('Category not found');
//     }

//     return category;
//   }

//   async delete(id: string): Promise<Category> {
//     const category = await this.categoryModel.findByIdAndDelete(id);
    
//     if (!category) {
//       throw new NotFoundException('Category not found');
//     }

//     return category;
//   }
// }

// @Injectable()
// export class CategoryService {
//   constructor(
//     @InjectModel('Category') private categoryModel: Model<Category>,
//     @InjectModel('Expense') private expenseModel: Model<Expense>
//   ) {}

// async findAll(): Promise<Category[]> {
//     return this.categoryModel.find().exec();
//   }


//   async findOrCreate(name: string): Promise<Category> {
//     const existing = await this.categoryModel.findOne({
//       name: { $regex: new RegExp(`^${name}$`, 'i') }
//     });

//     if (!existing) {
//       return this.categoryModel.create({ name });
//     }
//     return existing;
//   }

//   async updateCategory(id: string, newName: string): Promise<Category> {
//     return this.categoryModel.findByIdAndUpdate(
//       id,
//       { name: newName },
//       { new: true }
//     );
//   }

//   async deleteCategory(id: string): Promise<void> {
//     const category = await this.categoryModel.findById(id);
//     await this.expenseModel.deleteMany({ category: id });
//     await category.remove();
//   }
// }