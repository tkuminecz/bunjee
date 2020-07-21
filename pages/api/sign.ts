import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { withErrorHandler } from '~lib/api';
import connect from '~/db';
import { App } from '~/models/App';
import { encrypt } from '~/crypt';

export default withErrorHandler(async (req, res) => {
  if (req.method !== 'POST') throw new Error('Only POST is supported');

  const { appId, redirectUri } = req.body;

  if (!appId) throw new Error('No appId provided');
  if (!redirectUri) throw new Error('No redirectUri provided');

  // connect to db
  const disconnect = await connect();

  // fetch application
  const appRepository = getRepository(App);
  const app = appRepository.findOne(appId);

  if (!app) throw new Error(`No app found with id ${appId}`);

  const state = { appId, redirectUri };
  const secret = 'my-secret-key';

  res.json({ state: encrypt(secret, JSON.stringify(state)) });
  res.end();

  // close db connection
  await disconnect();
});
