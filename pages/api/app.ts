import { withDb, withErrorHandler } from '~lib/api';

export default withDb(
  withErrorHandler(async req => {
    switch (req.method.toUpperCase()) {
      default:
        throw new Error(`${req.method.toUpperCase()} not supported`);
    }
  })
);
