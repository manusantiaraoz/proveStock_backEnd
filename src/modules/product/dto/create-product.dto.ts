import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ description: 'nombre del producto', example: 'ram'})
    @IsString({ message: 'El nombre debe ser una cadena' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    name: string; 
    @ApiProperty({ description: 'detalle del producto', example: 'ddr3'})
    @IsString({ message: 'Lla descripcion debe ser una cadena' })
    @IsOptional()
    @MinLength(10, { message: 'el detalle debe tener al menos 10 caracteres' })
    @MaxLength(500, {
      message: 'La detalle no puede exceder los 500 caracteres',
    })
    detail: string;   
    @ApiProperty({ description: 'precio de compra', example: '22.11'})
    @IsNumber({maxDecimalPlaces:2})
    @IsPositive({message: 'el numero ingresado no debe ser negativo'})
    @IsNotEmpty()
    p_purchase: number;

    @ApiProperty({ description: 'precio de venta', example: '29.11'})
    @IsNumber({maxDecimalPlaces:2})
  @IsNotEmpty()
  @IsPositive({message: 'el numero ingresado no debe ser negativo'})
    p_sale: number;

    @ApiProperty({ description: 'identificador de proveedor', example: '1222112k1212k1222'})
    @IsUUID()
    @IsNotEmpty()
    providerId: string;
}
