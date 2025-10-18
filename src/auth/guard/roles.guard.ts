import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ROLES } from '../../common/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<ROLES>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      // No se requiere rol → acceso permitido
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      // No hay usuario autenticado → 401
      throw new UnauthorizedException('You must be logged in');
    }

    if (user.group === ROLES.SUPERADMIN) {
      // Superadmin tiene acceso a todo → acceso permitido
      return true;
    }

    if (user.group === ROLES.ADMIN) {
      // Admin tiene acceso a todo menos a recursos de superadmin → acceso permitido
      if (requiredRole === ROLES.SUPERADMIN) {
        throw new ForbiddenException('You do not have access to this resource');
      }
      return true;
    }

    if (user.group !== requiredRole) {
      // Usuario autenticado pero sin permiso → 403
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}
