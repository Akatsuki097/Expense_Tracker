import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
}
