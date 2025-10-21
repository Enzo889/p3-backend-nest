import { Module } from '@nestjs/common';
import { UserInterestService } from './user_interest.service';
import { UserInterestController } from './user_interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInterest } from './entities/user_interest.entity';
import { User } from 'src/entities/entities/user.entity';
import { NCategory } from 'src/entities/entities/ncategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInterest, User, NCategory])],
  controllers: [UserInterestController],
  providers: [UserInterestService],
})
export class UserInterestModule {}
