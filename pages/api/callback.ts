import { withErrorHandler } from '~lib/api';

export default withErrorHandler((req, res) => {
  res.end();
});
