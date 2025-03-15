/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} //The reflector is used to get metadata from the context of the request
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context); //Get the context of the request and create a new GraphQL context
    const user = ctx.getContext().req.user; // Get the user from the request context (the user is set in the auth middleware)

    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);
    return hasRequiredRoles;
  }
}

// canActivate determines whether a request is allowed.
// It returns true (allow access) or false (deny access).
// It can return:
// A boolean (true or false).
// A Promise<boolean> (for async checks).
// An Observable<boolean> (for reactive programming).
