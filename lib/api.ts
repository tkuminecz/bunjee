import { NextApiRequest, NextApiResponse } from 'next';

export const withErrorHandler = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await Promise.resolve(handler(req, res));
    } catch (err) {
      console.error(err);
      res.status(err.status || 500);
      res.send(err.message);
      res.end();
    }
  };
};
