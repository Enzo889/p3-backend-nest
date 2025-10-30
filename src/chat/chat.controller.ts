import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Request,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/enum/roles.enum';

/**
 * Controlador REST para el chat
 * Todas las rutas requieren autenticación (AuthGuard)
 */
@Controller('chat')
@Auth(ROLES.USER)
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  /**
   * GET /chat/conversations
   * Obtener todas las conversaciones del usuario autenticado
   *
   * @returns Array de conversaciones con resumen
   */
  @Get('conversations')
  @HttpCode(HttpStatus.OK)
  async getConversations(@Request() req) {
    const userId = req.user.id;

    this.logger.log(`📋 Usuario ${userId} solicitando lista de conversaciones`);

    return this.chatService.getConversations(userId);
  }

  /**
   * GET /chat/conversation/:otherUserId
   * Obtener historial de mensajes con otro usuario específico
   *
   * @param otherUserId - ID del otro usuario
   * @returns Array de mensajes ordenados cronológicamente
   */
  @Get('conversation/:otherUserId')
  @HttpCode(HttpStatus.OK)
  async getConversation(
    @Request() req,
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
  ) {
    const userId = req.user.id;

    this.logger.log(
      `💬 Usuario ${userId} cargando conversación con usuario ${otherUserId}`,
    );

    return this.chatService.getConversation(userId, otherUserId);
  }

  /**
   * GET /chat/unread
   * Obtener todos los mensajes no leídos del usuario
   *
   * @returns Array de mensajes no leídos
   */
  @Get('unread')
  @HttpCode(HttpStatus.OK)
  async getUnreadMessages(@Request() req) {
    const userId = req.user.id;

    this.logger.log(`📬 Usuario ${userId} solicitando mensajes no leídos`);

    return this.chatService.getUnreadMessages(userId);
  }

  /**
   * GET /chat/unread/count
   * Obtener contador de mensajes no leídos agrupados por remitente
   *
   * @returns Objeto con conteo por usuario { userId: count }
   */
  @Get('unread/count')
  @HttpCode(HttpStatus.OK)
  async getUnreadCount(@Request() req) {
    const userId = req.user.id;

    this.logger.log(`🔢 Usuario ${userId} solicitando contador de no leídos`);

    return this.chatService.getUnreadCount(userId);
  }

  /**
   * POST /chat/mark-read/:otherUserId
   * Marcar toda la conversación con otro usuario como leída
   *
   * @param otherUserId - ID del otro usuario
   * @returns Cantidad de mensajes marcados
   */
  @Post('mark-read/:otherUserId')
  @HttpCode(HttpStatus.OK)
  async markConversationAsRead(
    @Request() req,
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
  ) {
    const userId = req.user.id;

    this.logger.log(
      `✅ Usuario ${userId} marcando conversación con ${otherUserId} como leída`,
    );

    const count = await this.chatService.markConversationAsRead(
      userId,
      otherUserId,
    );

    return {
      success: true,
      messagesMarked: count,
      message: `${count} mensaje(s) marcado(s) como leído(s)`,
    };
  }
}
