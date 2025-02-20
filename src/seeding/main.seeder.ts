import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { Post } from '../entities/post.entity';
import { Tag } from '../entities/tag.entity';
import { faker } from '@faker-js/faker';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const postRepository = dataSource.getRepository(Post);
    const profileRepository = dataSource.getRepository(Profile);

    const userFactory = factoryManager.get(User);
    console.log('Seeding users...');
    const users = await userFactory.saveMany(25);

    const profileFactory = factoryManager.get(Profile);
    console.log('Seeding profiles...');
    for (const user of users) {
      const profile = await profileFactory.make();
      profile.user = Promise.resolve(user);
      await profileRepository.save(profile);
      user.profile = Promise.resolve(profile);
      await userRepository.save(user);
    }

    const tagFactory = factoryManager.get(Tag);
    console.log('Seeding tags...');
    const tags = await tagFactory.saveMany(10);

    const postFactory = factoryManager.get(Post);
    console.log('Seeding posts...');
    for (const user of users) {
      const posts = await postFactory.saveMany(2);
      for (const post of posts) {
        post.user = Promise.resolve(user);
        post.tags = Promise.resolve(faker.helpers.arrayElements(tags, 2));
        await postRepository.save(post);
      }
    }
  }
}
