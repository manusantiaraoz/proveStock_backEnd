import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Options, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { Response, Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Options('login')
  preflight(@Res() res: Response, @Req() req: Request): void {
    console.log('Solicitud OPTIONS recibida');
    console.log('Headers de la solicitud:', req.headers);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '3600');
    res.status(204).send();
  }

  @Post('login')
  login(@Body() Credential: LoginAuthDto) {
    return this.authService.login(Credential);
  }


}
