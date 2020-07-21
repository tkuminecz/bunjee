import { getConnectionManager } from 'typeorm';
import { App } from '~/models/App';
import { RedirectUri } from './models/RedirectUri';
import { User } from './models/User';

const connectionManager = getConnectionManager();
const connection = connectionManager.create({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entities: [App, RedirectUri, User],
});

export const connect = async (): Promise<() => Promise<void>> => {
  await connection.connect();
  return () => connection.close();
};

export default connect;
