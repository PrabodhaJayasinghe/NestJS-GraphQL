import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.username = faker.internet.username();
  user.email = faker.internet.email();
  return user;
});
