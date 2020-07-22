import { NextApiRequest, NextApiResponse } from 'next';
import graphqlServer from '~/graphql';
import { withDb } from '~/db';

export default withDb(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const graphql = await graphqlServer;
    return graphql.handleRequest(req, res);
  }
);