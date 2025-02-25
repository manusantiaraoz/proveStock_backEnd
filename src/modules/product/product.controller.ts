import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiCustomOperation } from 'src/common/decorators/swagger.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Roles(RoleEnum.USER)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


   @ApiBody({type: CreateProductDto})
      @ApiCustomOperation({
         summary: 'crea un nuevo producto',
         bodyType: CreateProductDto,
         responseStatus: 201,
         responseDescription: 'producto creado',
       })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiCustomOperation({
    summary: "devuelve todos los productos",
    responseStatus: 200,
    responseDescription: 'provedores found',
  })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiCustomOperation({
    summary: "devuelve un producto",
    responseStatus: 200,
    responseDescription: 'producto found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiCustomOperation({
    summary: "modifica un producto",
    responseStatus: 202,
    responseDescription: 'producto found',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() newProduc: UpdateProductDto) {
    return this.productService.update(id, newProduc);
  }

  @ApiCustomOperation({
    summary: "elimina un producto",
    responseStatus: 200,
    responseDescription: 'producto found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
