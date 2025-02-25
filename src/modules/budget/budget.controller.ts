import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEnum } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ApiCustomOperation } from 'src/common/decorators/swagger.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Roles(RoleEnum.USER)
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @ApiBody({type: CreateBudgetDto})
  @ApiCustomOperation({
     summary: 'crea un nuevo presupuesto',
     bodyType: CreateBudgetDto,
     responseStatus: 201,
     responseDescription: 'presupuesto creado',
   })
  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @ApiCustomOperation({
    summary: "devuelve todos los presupuestos creados por el usuario",
    responseStatus: 200,
    responseDescription: 'presupuesto found',
  })
  @Get()
  findAll() {
    return this.budgetService.findAll();
  }

  @ApiCustomOperation({
    summary: "devuelve un presupuesto",
    responseStatus: 200,
    responseDescription: 'presupuesto found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(id);
  }

  @ApiCustomOperation({
    summary: "elimina el presupuesto",
    responseStatus: 200,
    responseDescription: 'presupuesto found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(id);
  }
}
