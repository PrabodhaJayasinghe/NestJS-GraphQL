import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Post } from '../entities/post.entity';

export const PostFactory = setSeederFactory(Post, () => {
  const post = new Post();
  post.title = faker.lorem.words(5);
  post.content = faker.lorem.paragraph();
  return post;
});
