import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { ConversationResponseDto } from './dto/conversation-response.dto';
import { Message } from 'src/entities/entities/message.entity';
import { User } from 'src/entities/entities/user.entity';

@Injectable()
export class ChatService {
  // Logger para debugging y monitoreo
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * MÉTODO 1: Enviar un nuevo mensaje
   * 
   * @param senderId - ID del usuario que envía el mensaje
   * @param sendMessageDto - Datos del mensaje a enviar
   * @returns El mensaje creado con información completa
   */
  async sendMessage(
    senderId: number,
    sendMessageDto: SendMessageDto,
  ): Promise<MessageResponseDto> {
    const { receiverId, content, petitionId } = sendMessageDto;

    // Validación 1: Verificar que el receptor existe
    const receiver = await this.userRepository.findOne({
      where: { idUser: receiverId },
    });

    if (!receiver) {
      this.logger.warn(`Intento de enviar mensaje a usuario inexistente: ${receiverId}`);
      throw new NotFoundException('El usuario receptor no existe o está deshabilitado');
    }

    // Validación 2: Evitar que un usuario se envíe mensajes a sí mismo
    if (senderId === receiverId) {
      throw new BadRequestException('No puedes enviarte mensajes a ti mismo');
    }

    // Obtener información del remitente
    const sender = await this.userRepository.findOne({
      where: { idUser: senderId },
    });

    try {
      // Crear el mensaje en la base de datos
      const message = this.messageRepository.create({
        idSenderUser: senderId,
        idReceiverUser: receiverId,
        idPetition: petitionId || null, // Si no hay petición, se guarda como null
        content: content.trim(), // Eliminar espacios al inicio y final
        viewed: false,
        dateCreate: new Date(),
        dateUpdate: new Date(),
      });

      // Guardar en la base de datos
      const savedMessage = await this.messageRepository.save(message);

      this.logger.log(`Mensaje ${savedMessage.idMessage} enviado de ${senderId} a ${receiverId}`);

      // Retornar con información completa
      return new MessageResponseDto({
        ...savedMessage,
        senderName: sender?.name,
        senderEmail: sender?.email,
        receiverName: receiver.name,
        receiverEmail: receiver.email,
      });
    } catch (error) {
      this.logger.error(`Error al guardar mensaje: ${error.message}`, error.stack);
      throw new BadRequestException('Error al enviar el mensaje');
    }
  }

  /**
   * MÉTODO 2: Obtener conversación entre dos usuarios
   * 
   * @param userId - ID del usuario actual
   * @param otherUserId - ID del otro usuario
   * @returns Array de mensajes ordenados cronológicamente
   */
  async getConversation(
    userId: number,
    otherUserId: number,
  ): Promise<MessageResponseDto[]> {
    this.logger.log(`Cargando conversación entre ${userId} y ${otherUserId}`);

    // Query para obtener mensajes entre ambos usuarios
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.idSenderUser2', 'sender')
      .leftJoinAndSelect('message.idReceiverUser2', 'receiver')
      .where(
        '(message.idSenderUser = :userId AND message.idReceiverUser = :otherUserId) OR ' +
        '(message.idSenderUser = :otherUserId AND message.idReceiverUser = :userId)',
        { userId, otherUserId },
      )
      .orderBy('message.dateCreate', 'ASC') // Más antiguos primero
      .getMany();

    // Transformar a DTOs
    return messages.map(
      (msg) =>
        new MessageResponseDto({
          idMessage: msg.idMessage,
          idPetition: msg.idPetition,
          idSenderUser: msg.idSenderUser,
          idReceiverUser: msg.idReceiverUser,
          content: msg.content,
          viewed: msg.viewed,
          dateCreate: msg.dateCreate,
          dateUpdate: msg.dateUpdate,
          senderName: msg.idSenderUser2?.name,
          senderEmail: msg.idSenderUser2?.email,
          receiverName: msg.idReceiverUser2?.name,
          receiverEmail: msg.idReceiverUser2?.email,
        }),
    );
  }

  /**
   * MÉTODO 3: Obtener todas las conversaciones de un usuario
   * 
   * @param userId - ID del usuario
   * @returns Lista de conversaciones con información resumida
   */
  async getConversations(userId: number): Promise<ConversationResponseDto[]> {
    this.logger.log(`Obteniendo conversaciones para usuario ${userId}`);

    // Obtener todos los mensajes donde el usuario participa
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.idSenderUser2', 'sender')
      .leftJoinAndSelect('message.idReceiverUser2', 'receiver')
      .where('message.idSenderUser = :userId OR message.idReceiverUser = :userId', 
        { userId }
      )
      .orderBy('message.dateCreate', 'DESC')
      .getMany();

    // Agrupar mensajes por conversación (por el otro usuario)
    const conversationsMap = new Map<number, ConversationResponseDto>();

    messages.forEach((message) => {
      // Determinar quién es "el otro usuario"
      const isReceiver = message.idReceiverUser === userId;
      const otherUserId = isReceiver ? message.idSenderUser : message.idReceiverUser;
      const otherUser = isReceiver ? message.idSenderUser2 : message.idReceiverUser2;

      // Si ya existe la conversación, solo actualizar contador de no leídos
      if (conversationsMap.has(otherUserId)) {
        const conv = conversationsMap.get(otherUserId);
        
        // Contar mensajes no leídos (solo los recibidos)
        if (isReceiver && !message.viewed) {
          conv.unreadCount++;
        }
      } else {
        // Crear nueva entrada de conversación
        conversationsMap.set(
          otherUserId,
          new ConversationResponseDto({
            userId: otherUserId,
            userName: otherUser?.name || 'Usuario',
            userEmail: otherUser?.email || '',
            lastMessage: message.content,
            lastMessageDate: message.dateCreate,
            unreadCount: isReceiver && !message.viewed ? 1 : 0,
          }),
        );
      }
    });

    // Convertir Map a Array y ordenar por fecha más reciente
    return Array.from(conversationsMap.values()).sort(
      (a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime(),
    );
  }

  /**
   * MÉTODO 4: Marcar mensaje específico como leído
   * 
   * @param messageId - ID del mensaje
   * @param userId - ID del usuario que marca como leído (debe ser el receptor)
   */
  async markMessageAsRead(messageId: number, userId: number): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { idMessage: messageId },
    });

    if (!message) {
      throw new NotFoundException('Mensaje no encontrado');
    }

    // Solo el receptor puede marcar como leído
    if (message.idReceiverUser !== userId) {
      throw new BadRequestException('No puedes marcar este mensaje como leído');
    }

    // Solo marcar si no estaba leído
    if (!message.viewed) {
      message.viewed = true;
      message.dateUpdate = new Date();
      await this.messageRepository.save(message);
      
      this.logger.log(`Mensaje ${messageId} marcado como leído por usuario ${userId}`);
    }
  }

  /**
   * MÉTODO 5: Marcar toda una conversación como leída
   * 
   * @param userId - ID del usuario actual
   * @param otherUserId - ID del otro usuario
   * @returns Cantidad de mensajes marcados como leídos
   */
  async markConversationAsRead(
    userId: number,
    otherUserId: number,
  ): Promise<number> {
    this.logger.log(
      `Marcando conversación como leída: usuario ${userId} con ${otherUserId}`,
    );

    // Actualizar todos los mensajes no leídos de esta conversación
    const result = await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({ 
        viewed: true,
        dateUpdate: new Date(),
      })
      .where(
        'idReceiverUser = :userId AND idSenderUser = :otherUserId AND viewed = false',
        { userId, otherUserId },
      )
      .execute();

    this.logger.log(`${result.affected} mensajes marcados como leídos`);
    
    return result.affected || 0;
  }

  /**
   * MÉTODO 6: Obtener mensajes no leídos de un usuario
   * 
   * @param userId - ID del usuario
   * @returns Array de mensajes no leídos
   */
  async getUnreadMessages(userId: number): Promise<MessageResponseDto[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.idSenderUser2', 'sender')
      .where('message.idReceiverUser = :userId AND message.viewed = false', { userId })
      .orderBy('message.dateCreate', 'DESC')
      .getMany();

    return messages.map(
      (msg) =>
        new MessageResponseDto({
          idMessage: msg.idMessage,
          idPetition: msg.idPetition,
          idSenderUser: msg.idSenderUser,
          idReceiverUser: msg.idReceiverUser,
          content: msg.content,
          viewed: msg.viewed,
          dateCreate: msg.dateCreate,
          dateUpdate: msg.dateUpdate,
          senderName: msg.idSenderUser2?.name,
        }),
    );
  }

  /**
   * MÉTODO 7: Contar mensajes no leídos por conversación
   * 
   * @param userId - ID del usuario
   * @returns Objeto con el conteo por remitente
   */
  async getUnreadCount(userId: number): Promise<Record<number, number>> {
    const result = await this.messageRepository
      .createQueryBuilder('message')
      .select('message.idSenderUser', 'senderId')
      .addSelect('COUNT(*)', 'count')
      .where('message.idReceiverUser = :userId AND message.viewed = false', { userId })
      .groupBy('message.idSenderUser')
      .getRawMany();

    // Convertir a objeto { senderId: count }
    const countMap: Record<number, number> = {};
    result.forEach((row) => {
      countMap[row.senderId] = parseInt(row.count, 10);
    });

    return countMap;
  }
}