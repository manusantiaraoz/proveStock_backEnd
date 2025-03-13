import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Options, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ApiCustomOperation } from 'src/common/decorators/swagger.decorator';
import { Response, Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Roles(RoleEnum.USER)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
   // Maneja peticiones OPTIONS para todas las rutas en este controlador
   @Options('*')
   preflight(@Res() res: Response, @Req() req: Request): void {
     console.log('Solicitud OPTIONS recibida en UsersController');
     console.log('Headers de la solicitud:', req.headers);
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
     res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Max-Age', '3600');
     res.status(204).send();
   }
 
  @ApiBody({type: CreateUserDto})
      @ApiCustomOperation({
         summary: 'crea un nuevo proveedor',
         bodyType: CreateUserDto,
         responseStatus: 201,
         responseDescription: 'proveedor creado',
       })
  @Roles(RoleEnum.SUPERADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @ApiCustomOperation({
    summary: "devuelve todos los usuarios",
    responseStatus: 200,
    responseDescription: 'usuario found',
  })
  @Roles(RoleEnum.SUPERADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @ApiCustomOperation({
    summary: "devuelve un usuario",
    responseStatus: 200,
    responseDescription: 'usuario found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiCustomOperation({
    summary: "modifica un usuario",
    responseStatus: 202,
    responseDescription: 'usuario found',
  })
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @ApiCustomOperation({
    summary: "elimina un usuario",
    responseStatus: 200,
    responseDescription: 'usuario found',
  })
  @Roles(RoleEnum.SUPERADMIN)
  @Post('suspender/:id')
  suspender(@Param('id') id: string) {
    return this.usersService.suspender(id);
  }
  @Roles(RoleEnum.SUPERADMIN)
  @Post('active/:id')
  active(@Param('id') id: string) {
    return this.usersService.active(id);
  }
}
