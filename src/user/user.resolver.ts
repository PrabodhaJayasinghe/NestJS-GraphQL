import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);
  @Query(() => [User], { name: 'user' })
  async findAll() {
    return await this.userService.findAll();
  }

  //To resolve nested object relationships in GraphQL, we need to define a field resolver for the nested object.
  //In this case, we need to define a field resolver for the profile field in the User entity.
  //The field resolver is a function that resolves the value of a field in a GraphQL object.
  //The field resolver for the profile field in the User entity is defined in the UserResolver class.
  //The field resolver is a method that is decorated with the @ResolveField() decorator.

  @ResolveField('profile')
  async profile(@Parent() user: User) {
    this.logger.log(`Fetching profile for user ${user.id}`);
    return await user.profile;
  }
}
