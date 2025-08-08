import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/users.entity';
import { Task } from './tasks/tasks.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'task_management',
  entities: [User, Task],
  synchronize: false, // É importante que seja 'false' para usar migrações
  migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions);