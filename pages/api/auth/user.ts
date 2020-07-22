import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth0 } from '~/auth0';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const auth0 = await getAuth0();
  return auth0.handleProfile(req, res);
};
