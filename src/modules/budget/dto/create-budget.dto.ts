import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
    IsNotEmpty,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
    ValidateNested,
  } from 'class-validator';
  import { Type } from "class-transformer";

  export class CreateProductLineDto{
    
    @IsUUID()
    @IsNotEmpty()
    productId:string;
    @IsPositive()
   @IsNotEmpty()
    quantity: number;
   
  }

export class CreateBudgetDto {
    
    @ApiProperty({ description: 'identificador del cliente', example: 'qqqq-1111-eedee-qqqq'})
    @IsUUID()
    @IsNotEmpty({ message: 'El campo usuario no puede estar vacio' })
    clientId: string;

    @ApiProperty({ description: 'detalle del presupuesto', example: 'equipo poco cuidado'})
    @IsString({ message: 'La dirección debe ser una cadena' })
    @IsNotEmpty({ message: 'El campo usuario no puede estar vacio' })
    @MinLength(10, { message: 'el campo detalle debe tener como minimo 10 caracteres' })
    @MaxLength(500, {
      message: 'el campo detalle debe tener como maximo 500',
    })
    detail: string;

    @ApiProperty({
      description: 'Productos añadidos al carrito',
      type: 'array',
      items: { type: 'object', $ref: '#/components/schemas/CreateProductLineDto' }, // Referencia al DTO
      example: [
        { quantity: 2, productId: 'b5e0318f-0105-4ae1-bf67-9edec9a9b4f1' },
        { quantity: 1, productId: 'b5e0311f-1105-1Be1-bQ17-2Adec9a9b4f1' },
      ],
    })
  @IsNotEmpty({message: 'no puede estar vacio'})
  @IsArray({ message:'debe ser un array' } )
  @ArrayMinSize(1,{message: 'debe contener al menos 1 producto'})
  @ArrayMaxSize(15,{message:'el largo maximo debe ser 15'})
  @ValidateNested({each:true})
  @Type(()=>CreateProductLineDto)
    productLine: CreateProductLineDto[];
    
}
