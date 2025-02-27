import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';


export class CreateClientDto {
  @ApiProperty({ description: 'nombre del usuario', example: 'pepe'})
    @IsString({ message: 'El nombre debe ser una cadena' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    name: string;
    @ApiProperty({ description: 'apellido del usuario', example: 'ramirez'})
    @IsString({ message: 'El apellido debe ser una cadena' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El apellido no puede exceder los 50 caracteres' })
    lastName: string;
    @ApiProperty({ description: 'telefono', example: '3814784211'})
    @IsString({ message: 'El teléfono debe ser una cadena' })
    @IsNotEmpty({ message: 'El teléfono no puede estar vacio' })
    @MinLength(9, { message: 'El teléfono debe tener al menos 9 dígitos' })
    @MaxLength(15, { message: 'El teléfono no puede exceder los 15 dígitos' })
    phone: string;
    @ApiProperty({ description: 'direccion', example: 'calle falsa 123'})
    @IsString({ message: 'La dirección debe ser una cadena' })
    @IsNotEmpty({ message: 'El dirección no puede estar vacio' })
    @MinLength(10, { message: 'La dirección debe tener al menos 10 caracteres' })
    @MaxLength(100, {
    message: 'La dirección no puede exceder los 100 caracteres',
    })
    address: string;
    @ApiProperty({ description: 'dni', example: '38090121'})
    @IsNotEmpty({ message: 'El campo dni no puede estar vacio' })
    @MinLength(8, { message: 'El dni debe tener al menos 8 caracteres' })
    @MaxLength(12, { message: 'El dni no puede exceder los 12 caracteres' })
    dni: string;
    @ApiProperty({ description: 'email', example: 'example@gmail.com'})
    @IsNotEmpty({ message: 'El email no puede estar vacio' })
    @IsEmail({}, { message: 'Debe ingresar un email válido' })
    email: string;
}
