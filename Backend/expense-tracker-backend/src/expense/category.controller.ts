// import { Controller, Get } from '@nestjs/common';
// import { CategoryService } from './category.service';
// import { Category } from './schema/category.schema';

// @Controller('categories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Get()
//   async findAll(): Promise<Category[]> {
//     return this.categoryService.findAll();
//   }
// }

import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param 
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { Category } from './schema/category.schema';
  
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Get()
    async findAll(): Promise<Category[]> {
      return await this.categoryService.findAll();
    }
  
    @Post()
    async create(@Body() category: { name: string }): Promise<Category> {
      return this.categoryService.create(category.name);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() category: { name: string }
    ): Promise<Category> {
      return this.categoryService.update(id, category.name);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Category> {
      return this.categoryService.delete(id);
    }
  }