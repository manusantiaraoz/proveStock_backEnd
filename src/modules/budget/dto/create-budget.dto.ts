import {
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
  } from 'class-validator';

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
    
}
