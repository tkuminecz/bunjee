import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { Connection } from 'typeorm';
import { createDbConnection } from '~/db';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDb = (
  doWork: (
    req: NextApiRequest,
    res: NextApiResponse,
    conn: Connection
  ) => Promise<void>
): NextApiHandler => {
  return async (req, res: NextApiResponse) => {
    const connection = await createDbConnection();
    try {
      await Promise.resolve(doWork(req, res, connection));
    } finally {
      await connection.close();
    }
  };
};
