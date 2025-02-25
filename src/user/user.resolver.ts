import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);
  @Query(() => [User], { name: 'user' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
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

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
