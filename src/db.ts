import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { App } from '~/models/App';
import { RedirectUri } from './models/RedirectUri';
import { User } from './models/User';

export const createDbConnection = async (): Promise<Connection> => {
  return createConnection({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: true,
    entityPrefix: process.env.DB_PREFIX,
    entities: [App, RedirectUri, User],
  });
};
