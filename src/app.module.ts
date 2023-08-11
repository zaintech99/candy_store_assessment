import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { StoreModule } from './store/store.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { HttpExceptionFilter } from './shared/exception-filter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/loger.middleware';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1200,
    }),
    InventoryModule,
    StoreModule,
    CustomerModule,
    OrderModule,
    AuthModule
  ],

  providers: [
    {
      provide: "APP_FILTER",
      useClass: HttpExceptionFilter,
    },
    {
      provide: "APP_GUARD",
      useClass: ThrottlerGuard
    },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
