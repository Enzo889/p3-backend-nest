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

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ies9021.edu.ar',
      port: 3306,
      username: 'ies9021_userdb',
      password: 'Xsw23edc.2025',
      database: 'ies9021_coco',
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
