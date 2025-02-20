import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Tag } from '../entities/tag.entity';

export const TagFactory = setSeederFactory(Tag, () => {
  const tag = new Tag();
  tag.name = faker.lorem.word();
  return tag;
});
