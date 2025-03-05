import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'src/config/env-validation.config';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientModule } from '../client/client.module';
import { ProviderModule } from '../prov/provider.module';
import { ProductModule } from '../product/product.module';
import { BudgetModule } from '../budget/budget.module';
import { AuthModule } from '../auth/auth.module';
import { OptionsMiddleware } from '../middleware/options.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    UsersModule,
    ClientModule,
    ProviderModule,
    ProductModule,
    BudgetModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OptionsMiddleware).forRoutes('*');
  }
}
