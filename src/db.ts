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

export const connect = async (): Promise<() => Promise<void>> => {
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
