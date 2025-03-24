import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
    create(category: {
        name: string;
    }): Promise<Category>;
    update(id: string, category: {
        name: string;
    }): Promise<Category>;
    delete(id: string): Promise<Category>;
}
