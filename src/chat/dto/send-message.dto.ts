import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SendMessageDto {
  @IsInt({ message: 'El ID del receptor debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del receptor es obligatorio' })
  receiverId: number;

  @IsString({ message: 'El contenido debe ser texto' })
  @IsNotEmpty({ message: 'El mensaje no puede estar vacío' })
  @MaxLength(5000, { message: 'El mensaje no puede exceder 5000 caracteres' })
  content: string;

  @IsInt({ message: 'El ID de la petición debe ser un número entero' })
  @IsOptional() // Este campo es opcional
  petitionId?: number;
}
