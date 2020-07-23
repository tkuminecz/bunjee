import { NextApiRequest, NextApiResponse } from 'next';
import { ISession } from '@auth0/nextjs-auth0/dist/session/session';
import { getRepository } from 'typeorm';
import { getAuth0 } from '~/auth0';
import { withDb } from '~/db';
import { User } from '~/models/User';

export default withDb(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const auth0 = await getAuth0();
    const onUserLoaded = async (rq, rs, session: ISession) => {
      const email: void | string = session?.user?.email;
      if (!email) throw new Error('User claims does not include email!');
      const userRepo = getRepository(User);
      const existing = await userRepo.findOne({ where: { email } });
      if (!existing) {
        // first time, create the user object
        const user = await userRepo.create({ email });
        await userRepo.save(user);
      }
      return session;
    };
    await auth0.handleCallback(req, res, { onUserLoaded });
  }
);
