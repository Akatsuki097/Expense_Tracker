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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_service_1 = require("./category.service");
let ExpenseService = class ExpenseService {
    expenseModel;
    categoryService;
    constructor(expenseModel, categoryService) {
        this.expenseModel = expenseModel;
        this.categoryService = categoryService;
    }
    async create(createExpenseDto) {
        const category = await this.categoryService.findOrCreate(createExpenseDto.category);
        const createdExpense = new this.expenseModel({
            ...createExpenseDto,
            category: category._id
        });
        await createdExpense.save();
        return createdExpense.populate('category');
    }
    async findAll(options) {
        const { page, limit, category } = options;
        const filter = category ? { category } : {};
        return await this.expenseModel.find(filter)
            .populate({
            path: 'category',
            select: 'name',
            options: { retainNullValues: true }
        })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }
    async findOne(id) {
        const expense = await this.expenseModel.findById(id).exec();
        if (!expense) {
            throw new common_1.NotFoundException(`Expense #${id} not found`);
        }
        return expense;
    }
    async update(id, updateExpenseDto) {
        const updatePayload = { ...updateExpenseDto };
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
            throw new common_1.NotFoundException(`Expense #${id} not found`);
        }
        return updatedExpense;
    }
    async remove(id) {
        return await this.expenseModel.findByIdAndDelete(id);
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Expense')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map