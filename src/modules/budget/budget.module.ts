import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { PrinterModule } from '../printer/printer.module';

@Module({
  imports:[PrinterModule],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
