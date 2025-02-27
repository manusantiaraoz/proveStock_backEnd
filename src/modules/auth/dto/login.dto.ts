import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class LoginAuthDto {
  @ApiProperty({ description: 'User email', example: 'user@gmail.com' })
  @IsEmail({}, { message: 'debe seguir el formato example@gmail.com' })
  @IsNotEmpty({ message: 'no debe estar vacio' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password' })
  @IsString({ message: 'debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'no debe estar vacio' })
  password: string;
}
