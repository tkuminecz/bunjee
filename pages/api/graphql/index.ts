import { NextApiRequest, NextApiResponse } from 'next';
import { withDb } from '~lib/api';
import getGraphqlServer from '~/apolloServer';

export default withDb(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const graphql = await getGraphqlServer();
    return graphql.handleRequest(req, res);
  }
);
