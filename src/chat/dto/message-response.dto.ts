export class MessageResponseDto {
  idMessage: number;
  idPetition?: number;
  idSenderUser: number;
  idReceiverUser: number;
  content: string;
  viewed: boolean;
  dateCreate: Date;
  dateUpdate: Date;

  // Información adicional del remitente
  senderName?: string;
  senderEmail?: string;

  // Información adicional del receptor
  receiverName?: string;
  receiverEmail?: string;

  constructor(partial: Partial<MessageResponseDto>) {
    Object.assign(this, partial);
  }
}
