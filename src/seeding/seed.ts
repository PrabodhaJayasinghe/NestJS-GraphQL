import dbConfig from '../config/db.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';
import { UserFactory } from './user.factory';
import { PostFactory } from './post.factory';
import { TagFactory } from './tag.factory';
import { ProfileFactory } from './profile.factory';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [UserFactory, PostFactory, TagFactory, ProfileFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource
  .initialize()
  .then(async () => {
    await datasource.synchronize(true);
    await runSeeders(datasource);
    process.exit();
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });
