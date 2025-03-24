"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    categoryModel;
    expenseModel;
    constructor(categoryModel, expenseModel) {
        this.categoryModel = categoryModel;
        this.expenseModel = expenseModel;
    }
    async findOrCreate(name) {
        let category = await this.categoryModel.findOne({ name });
        if (!category) {
            category = await this.categoryModel.create({ name });
            await category.save();
        }
        return category;
    }
    async findAll() {
        return this.categoryModel.find().exec();
    }
    async create(name) {
        const existing = await this.categoryModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });
        if (existing) {
            throw new Error('Category already exists');
        }
        const newCategory = new this.categoryModel({ name });
        return newCategory.save();
    }
    async update(id, newName) {
        const category = await this.categoryModel.findByIdAndUpdate(id, { name: newName }, { new: true });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async delete(id) {
        const category = await this.categoryModel.findByIdAndDelete(id);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.expenseModel.updateMany({ category: id }, { $unset: { category: "" } });
        return category;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __param(1, (0, mongoose_1.InjectModel)('Expense')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map