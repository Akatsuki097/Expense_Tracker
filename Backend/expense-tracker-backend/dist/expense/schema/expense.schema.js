"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ExpenseSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    recurring: { type: Boolean, default: false },
    recurrenceInterval: { type: String, enum: ['daily', 'weekly', 'monthly'] },
});
//# sourceMappingURL=expense.schema.js.map