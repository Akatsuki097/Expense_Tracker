import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateExpenseDto {
    @IsNumber()
    readonly amount: number;
    
    @IsString()
    @IsOptional()
    readonly description?: string;
    readonly date?: Date;
    category: string;
    readonly recurring?: boolean;
    readonly recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
  }
  