import { getRepository } from 'typeorm';
import qs from 'qs';
import { withDb, withErrorHandler } from '~lib/api';
import { App } from '~/models/App';
import { decrypt } from '~/crypt';

export default withErrorHandler(
  withDb(async (req, res) => {
    const { appId, state, code } = req.query;
    if (!appId) throw new Error('No appId provided!');
    if (!state) throw new Error('No state provided!');
    if (!code) throw new Error('No code provided!');

    const appRepository = getRepository(App);
    const app = await appRepository.findOne(appId as string);
    if (!app) throw new Error(`No app found with id ${appId}`);

    try {
      const payload = JSON.parse(decrypt(app.secret, state as string));
      const bounceUrl = `${payload.redirectUri}?${qs.stringify({
        code,
        state,
      })}`;
      res.writeHead(302, {
        Location: bounceUrl,
      });
      res.end();
    } catch (err) {
      console.error(err);
      throw new Error(`Error decrypting state`);
    }
  })
);
