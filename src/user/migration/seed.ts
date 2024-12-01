import { DataSource } from 'typeorm';
import { User } from '../user.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'new_password',
    database: 'userdata_db',
    entities: [User],
    synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const users = [];

  for (let i = 0; i < 1000; i++) {
    users.push(
      userRepository.create({
        firstName: `User${i}`,
        lastName: `LastName${i}`,
        age: Math.floor(Math.random() * 60) + 18,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        hasIssues: Math.random() > 0.7,
      }),
    );
  }

  await userRepository.save(users);
  console.log('Seed completed');
  await AppDataSource.destroy();
}

seed();
