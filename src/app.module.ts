import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { InterestModule } from './interest/interest.module';
import { PetitionModule } from './petition/petition.module';
import { PostulationsModule } from './postulations/postulations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UserInterestModule } from './user_interest/user_interest.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    CategoryModule,
    InterestModule,
    PetitionModule,
    PostulationsModule,
    NotificationsModule,
    UserInterestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
