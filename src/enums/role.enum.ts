import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, { name: 'Role' }); //The registerEnumType() function is used to register the Role enum with the GraphQL schema.
