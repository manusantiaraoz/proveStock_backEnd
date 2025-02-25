import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiCustomOperation } from 'src/common/decorators/swagger.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Roles(RoleEnum.USER)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiBody({type: CreateClientDto})
    @ApiCustomOperation({
       summary: 'crea un nuevo cliente',
       bodyType: CreateClientDto,
       responseStatus: 201,
       responseDescription: 'presupuesto creado',
     })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiCustomOperation({
    summary: "devuelve todos los clientes",
    responseStatus: 200,
    responseDescription: 'clientes found',
  })
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  
  @ApiCustomOperation({
    summary: "devuelve un cliente",
    responseStatus: 200,
    responseDescription: 'clientes found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  
  @ApiCustomOperation({
    summary: "modificia un cliente",
    responseStatus: 202,
    responseDescription: 'clientes found',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  
  @ApiCustomOperation({
    summary: "elimina un cliente",
    responseStatus: 200,
    responseDescription: 'clientes found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
