export class ConversationResponseDto {
  userId: number; // ID del otro usuario
  userName: string; // Nombre del otro usuario
  userEmail: string; // Email del otro usuario
  lastMessage: string; // Último mensaje enviado
  lastMessageDate: Date; // Fecha del último mensaje
  unreadCount: number; // Cantidad de mensajes no leídos
  isOnline?: boolean; // Si el usuario está conectado (opcional)

  constructor(partial: Partial<ConversationResponseDto>) {
    Object.assign(this, partial);
  }
}
