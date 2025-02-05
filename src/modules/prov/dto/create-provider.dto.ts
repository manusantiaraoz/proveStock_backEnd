import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateProviderDto {
       @IsString({ message: 'El nombre debe ser una cadena' })
        @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
        @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
        name: string;
        
        @IsString({ message: 'El teléfono debe ser una cadena' })
        @IsNotEmpty({ message: 'El teléfono no puede estar vacio' })
        @MinLength(9, { message: 'El teléfono debe tener al menos 9 dígitos' })
        @MaxLength(15, { message: 'El teléfono no puede exceder los 15 dígitos' })
        phone: string;
        
        @IsString({ message: 'La dirección debe ser una cadena' })
        @IsNotEmpty({ message: 'El dirección no puede estar vacio' })
        @MinLength(10, { message: 'La dirección debe tener al menos 10 caracteres' })
        @MaxLength(100, {
        message: 'La dirección no puede exceder los 100 caracteres',
        })
        address: string;
        
        @IsNotEmpty({ message: 'El campo dni no puede estar vacio' })
        @MinLength(8, { message: 'El dni debe tener al menos 8 caracteres' })
        @MaxLength(12, { message: 'El dni no puede exceder los 12 caracteres' })
        dni: string;
        
        @IsNotEmpty({ message: 'El email no puede estar vacio' })
        @IsEmail({}, { message: 'Debe ingresar un email válido' })
        email: string;
}
