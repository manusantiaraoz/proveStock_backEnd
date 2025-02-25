import {
  IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
  } from 'class-validator';


  export class CreateProductLineDto{
    @IsOptional()
    budgetId: string;
    @IsUUID()
    @IsNotEmpty()
    productId:string;
    @IsPositive()
   @IsNotEmpty()
    quantity: number;
    @IsPositive()
    @IsNotEmpty()
    unit_price: number;
    @IsPositive()
    @IsNotEmpty()
    total_price: number
  }

export class CreateBudgetDto {
    @IsUUID()
    @IsNotEmpty({ message: 'El campo usuario no puede estar vacio' })
    userId:string;
    
    @IsUUID()
    @IsNotEmpty({ message: 'El campo usuario no puede estar vacio' })
    clientId: string;

    @IsString({ message: 'La dirección debe ser una cadena' })
    @IsNotEmpty({ message: 'El campo usuario no puede estar vacio' })
    @MinLength(10, { message: 'el campo detalle debe tener como minimo 10 caracteres' })
    @MaxLength(500, {
      message: 'el campo detalle debe tener como maximo 500',
    })
    detail: string;

    @IsNumber()
    @IsNotEmpty({message: 'no se puede crear presupuesto sin un total'})
    totalAmount: number;

    @IsArray()
    @IsNotEmpty({message: 'no se puede crear presupuesto sin productos'})
    productLine: CreateProductLineDto[];
    
}
