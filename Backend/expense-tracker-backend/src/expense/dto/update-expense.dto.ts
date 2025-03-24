// expense/dto/update-expense.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateExpenseDto {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsString()
    description?: string;

    readonly date?: Date;

    @IsOptional()
    @IsString()
    category?: string; 
    readonly recurring?: boolean;
    readonly recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
  }
  