import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './routes/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './routes/auth/guards/jwt-auth.guard';
import { RegisterModule } from './routes/register/register.module';
import { UsersModule } from './routes/users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './globalGuards/throttler-proxy.guard';
import { VacanciesModule } from './routes/vacancies/vacancies.module';
import { ColumnsModule } from './routes/columns/columns.module';
import { CandidatesModule } from './routes/candidates/candidates.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>(
          'DB_USER',
        )}:${configService.get<string>('DB_PASS')}@localhost:35644/pipelite`,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    AuthModule,
    UsersModule,
    RegisterModule,
    VacanciesModule,
    ColumnsModule,
    CandidatesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
