import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiCustomOperation } from 'src/common/decorators/swagger.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Roles(RoleEnum.USER)
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @ApiBody({type: CreateProviderDto})
    @ApiCustomOperation({
       summary: 'crea un nuevo proveedor',
       bodyType: CreateProviderDto,
       responseStatus: 201,
       responseDescription: 'proveedor creado',
     })
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @ApiCustomOperation({
    summary: "devuelve todos los proveedores creados por el usuario",
    responseStatus: 200,
    responseDescription: 'presupuesto found',
  })
  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @ApiCustomOperation({
    summary: "devuelve un proveedor",
    responseStatus: 200,
    responseDescription: 'proveedor found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(id);
  }

  @ApiCustomOperation({
    summary: "modifica un proveedor",
    responseStatus: 202,
    responseDescription: 'proveedor found',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providerService.update(id, updateProviderDto);
  }

  @ApiCustomOperation({
    summary: "elimina un proveedor",
    responseStatus: 200,
    responseDescription: 'proveedor found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(id);
  }
}
