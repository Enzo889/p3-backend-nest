// src/chat/chat.gateway.ts

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { SocketWithUser } from './interfaces/socket-with-user.interface';
import { jwtConstants } from '../auth/constants/jwt.constant';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/api/v1/chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<number, string>();

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    this.logger.log('🚀 WebSocket Gateway inicializado');
    this.logger.log(`📡 Namespace: /api/v1/chat`);
    this.logger.log(
      `🌍 CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`,
    );
  }

  async handleConnection(client: SocketWithUser) {
    this.logger.log(`🔄 Intento de conexión desde: ${client.id}`);

    try {
      // Intentar obtener el token de múltiples fuentes
      let token = client.handshake.auth.token;

      if (!token) {
        const authHeader = client.handshake.headers.authorization;
        if (authHeader) {
          token = authHeader.replace('Bearer ', '').trim();
        }
      }

      if (!token) {
        token = client.handshake.query.token as string;
      }

      if (!token) {
        this.logger.warn(`❌ Sin token - Socket ${client.id}`);
        throw new UnauthorizedException(
          'No se proporcionó token de autenticación',
        );
      }

      this.logger.log(`🔑 Verificando token...`);

      // Verificar JWT
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      this.logger.log(
        `✅ Token válido para usuario: ${payload.name} (ID: ${payload.id})`,
      );

      client.data.user = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        group: payload.group,
      };

      this.connectedUsers.set(payload.id, client.id);

      this.logger.log(
        `✅ Cliente conectado: ${client.id} | Usuario: ${payload.name} (ID: ${payload.id})`,
      );

      // Notificar a todos que este usuario está online
      this.server.emit('user:online', {
        userId: payload.id,
        userName: payload.name,
      });

      // Enviar lista de usuarios online al cliente recién conectado
      const onlineUserIds = Array.from(this.connectedUsers.keys());
      client.emit('users:online', { userIds: onlineUserIds });
    } catch (error) {
      this.logger.error(`❌ Error en conexión: ${error.message}`);

      client.emit('error', {
        message: 'Error de autenticación',
        details: error.message,
      });

      client.disconnect();
    }
  }

  handleDisconnect(client: SocketWithUser) {
    const userId = client.data.user?.id;
    const userName = client.data.user?.name;

    if (userId) {
      this.connectedUsers.delete(userId);

      this.logger.log(
        `👋 Cliente desconectado: ${client.id} | Usuario: ${userName} (ID: ${userId})`,
      );

      this.server.emit('user:offline', {
        userId,
        userName,
      });
    } else {
      this.logger.log(`👋 Cliente desconectado: ${client.id} (no autenticado)`);
    }
  }

  @SubscribeMessage('message:send')
  async handleSendMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: SocketWithUser,
  ) {
    try {
      const senderId = client.data.user.id;
      const senderName = client.data.user.name;

      this.logger.log(
        `💬 Mensaje de ${senderName} (${senderId}) para usuario ${sendMessageDto.receiverId}`,
      );

      const savedMessage = await this.chatService.sendMessage(
        senderId,
        sendMessageDto,
      );

      client.emit('message:sent', savedMessage);

      const receiverSocketId = this.connectedUsers.get(
        sendMessageDto.receiverId,
      );

      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('message:receive', savedMessage);
        this.logger.log(
          `📨 Mensaje entregado en tiempo real a socket ${receiverSocketId}`,
        );
      } else {
        this.logger.log(
          `📪 Receptor ${sendMessageDto.receiverId} offline - mensaje guardado`,
        );
      }

      return {
        success: true,
        message: savedMessage,
      };
    } catch (error) {
      this.logger.error(`❌ Error enviando mensaje: ${error.message}`);

      client.emit('message:error', {
        message: 'Error al enviar mensaje',
        details: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }

  @SubscribeMessage('message:read')
  async handleMarkAsRead(
    @MessageBody() data: { otherUserId: number },
    @ConnectedSocket() client: SocketWithUser,
  ) {
    try {
      const userId = client.data.user.id;

      this.logger.log(
        `👁️ Usuario ${userId} marcando como leída conversación con ${data.otherUserId}`,
      );

      const count = await this.chatService.markConversationAsRead(
        userId,
        data.otherUserId,
      );

      const otherSocketId = this.connectedUsers.get(data.otherUserId);
      if (otherSocketId) {
        this.server.to(otherSocketId).emit('messages:read', {
          userId,
          count,
        });
      }

      return {
        success: true,
        count,
      };
    } catch (error) {
      this.logger.error(`❌ Error marcando como leído: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @SubscribeMessage('typing:start')
  handleTypingStart(
    @MessageBody() data: { receiverId: number },
    @ConnectedSocket() client: SocketWithUser,
  ) {
    const receiverSocketId = this.connectedUsers.get(data.receiverId);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('typing:start', {
        userId: client.data.user.id,
        userName: client.data.user.name,
      });
    }
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(
    @MessageBody() data: { receiverId: number },
    @ConnectedSocket() client: SocketWithUser,
  ) {
    const receiverSocketId = this.connectedUsers.get(data.receiverId);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('typing:stop', {
        userId: client.data.user.id,
      });
    }
  }

  @SubscribeMessage('users:request')
  handleUsersRequest(@ConnectedSocket() client: SocketWithUser) {
    const onlineUserIds = Array.from(this.connectedUsers.keys());

    client.emit('users:online', {
      userIds: onlineUserIds,
      count: onlineUserIds.length,
    });

    return {
      success: true,
      count: onlineUserIds.length,
    };
  }
}
