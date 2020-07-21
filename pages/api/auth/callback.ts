import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth0 } from '~/auth0';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await getAuth0().handleCallback(req, res);
};
