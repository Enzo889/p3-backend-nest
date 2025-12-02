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
import { ChatModule } from './chat/chat.module';
import { ProviderModule } from './provider/provider.module';
import { ProfessionModule } from './profession/profession.module';
import { TypeProviderModule } from './type_provider/type_provider.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AttachmentModule } from './attachment/attachment.module';

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
    ChatModule,
    ProviderModule,
    ProfessionModule,
    TypeProviderModule,
    UserProfileModule,
    PortfolioModule,
    AttachmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
