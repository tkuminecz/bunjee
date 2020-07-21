import { withErrorHandler } from '~lib/api';

export default withErrorHandler((req, res) => {
  if (req.method !== 'POST') throw new Error('Only POST is supported');

  res.json(req.body);

  res.end();
});
