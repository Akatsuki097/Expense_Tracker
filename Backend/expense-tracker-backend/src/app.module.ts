// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './expense/category.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/expense-tracker', {
    }),
    ScheduleModule.forRoot(), // For cron jobs
    ExpenseModule,
    CategoryModule,
    // Other modules (e.g., CategoryModule) go here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
