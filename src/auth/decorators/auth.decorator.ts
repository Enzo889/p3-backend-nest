import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';
import { ROLES } from '../enum/roles.enum';

export function Auth(role: ROLES) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
