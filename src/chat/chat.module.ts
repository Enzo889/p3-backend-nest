import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { Message } from 'src/entities/entities/message.entity';
import { User } from 'src/entities/entities/user.entity';

@Module({
  imports: [
    // Solo importar las entidades necesarias
    TypeOrmModule.forFeature([Message, User]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
