import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions={
    origin:true,
    methods:['GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Autorization', 'X-Requested-With'],
    credentials: true,
    preflightContinue: true,
};