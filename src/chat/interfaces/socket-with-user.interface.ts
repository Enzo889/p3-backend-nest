import { Socket } from 'socket.io';

/**
 * Interface extendida de Socket que incluye datos del usuario autenticado
 * Socket.IO permite agregar propiedades personalizadas en socket.data
 */
export interface SocketWithUser extends Socket {
  data: {
    user: {
      id: number; // ID del usuario desde el JWT
      email: string; // Email del usuario
      name: string; // Nombre del usuario
      group: number; // Grupo/rol del usuario
    };
  };
}
