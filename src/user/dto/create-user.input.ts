import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
//import { IsEnum } from 'class-validator';
//import { Role } from 'src/enums/role.enum';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field() // Field decorator is used to define the schema of the input type
  username: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  // @IsEnum(Role)
  // @Field(() => Role)
  // role: Role;

  @Field()
  @IsString()
  @MinLength(3)
  password: string;
}
