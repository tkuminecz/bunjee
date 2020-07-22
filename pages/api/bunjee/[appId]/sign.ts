import 'reflect-metadata';
import { getRepository } from 'typeorm';
import matcher from 'matcher';
import { App } from '~/models/App';
import { encrypt } from '~/crypt';
import { withErrorHandler } from '~lib/api';
import { withDb } from '~/db';
import { getBaseUrl } from '~/helpers';
import { getCanonicalUrl } from '~/vercel';

export default withDb(
  withErrorHandler(async (req, res) => {
    if (req.method !== 'POST') throw new Error('Only POST is supported');

    const { appId } = req.query;
    const { redirectUri } = req.body;

    if (!appId) throw new Error('No appId provided');
    if (!redirectUri) throw new Error('No redirectUri provided');

    // fetch application
    const appRepository = getRepository(App);
    const app = await appRepository.findOne(appId as string);

    if (!app) throw new Error(`No app found with id ${appId}`);
    const redirects = await app.redirectUris;

    // check if redirect Uri matches
    const uriMatches = matcher.isMatch(
      redirectUri,
      redirects.map(r => r.uri)
    );
    if (!uriMatches) throw new Error('Invalid redirectUri');

    const state = encrypt(app.secret, JSON.stringify({ redirectUri }));
    const canonicalUrl = await getCanonicalUrl();
    res.json({
      redirectUri: `${getBaseUrl(canonicalUrl)}/api/app/${appId}/callback`,
      state,
    });
    res.end();
  })
);
