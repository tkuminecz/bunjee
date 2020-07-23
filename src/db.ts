import 'reflect-metadata';
import { getConnectionManager } from 'typeorm';
import { App } from '~/models/App';
import { RedirectUri } from './models/RedirectUri';
import { User } from './models/User';

const connectionManager = getConnectionManager();
const connection = connectionManager.create({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entityPrefix: process.env.DB_PREFIX,
  entities: [App, RedirectUri, User],
});

let connections = 0;

export const connect = async (): Promise<() => Promise<void>> => {
  if (process.env.PERSISTENT_DB_CONNECTS === 'true') {
    connections += 1;
    if (!connection.isConnected) {
      await connection.connect();
    }
    // eslint-disable-next-line no-console
    console.log('db connection', connection, connection.entityMetadatas);

    return async () => {
      connections -= 1;
      if (connections === 0) {
        await connection.close();
      }
    };
  }

  await connection.connect();
  return () => connection.close();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDb = <T extends (...args: any[]) => Promise<void>>(
  doWork: T
): (() => Promise<void>) => {
  return async (...args: Parameters<T>) => {
    const disconnect = await connect();
    try {
      await Promise.resolve(doWork(...args));
    } catch (err) {
      await disconnect();
      throw err;
    }
    await disconnect();
  };
};
