import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter<EntityNotFoundError>
  implements GqlExceptionFilter
{
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return new NotFoundException('Entity not found');
  }
}
// The EntityNotFoundFilter class is a custom exception filter that catches the EntityNotFoundError exception thrown by TypeORM when an entity is not found in the database.
// The catch() method of the EntityNotFoundFilter class called when the EntityNotFoundError exception is thrown.
