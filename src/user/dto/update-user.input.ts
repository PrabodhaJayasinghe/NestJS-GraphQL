import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType() //The @InputType() decorator is used to define the input type for the UpdateUserInput class.
export class UpdateUserInput extends PartialType(CreateUserInput) {}
