import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Profile } from '../entities/profile.entity';

export const ProfileFactory = setSeederFactory(Profile, () => {
  const profile = new Profile();
  profile.bio = faker.lorem.sentence();
  profile.avatar = faker.image.avatar();
  return profile;
});
