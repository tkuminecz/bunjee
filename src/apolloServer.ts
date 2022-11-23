import 'reflect-metadata'
import { ApolloServer } from '@tkuminecz/apollo-server-next'
import { NextPageContext } from 'next'
import { buildSchema, ClassType, NonEmptyArray } from 'type-graphql'
import { getRepository } from 'typeorm'
import { NextApiHandler } from 'next'
import { User } from './models/User'
import * as resolvers from '~/resolvers'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth'

export interface GqlContext extends NextPageContext {
  session: Session
  user: User
}

interface ApolloServerModule {
  handleRequest: NextApiHandler
}

const bootstrap = async (): Promise<ApolloServerModule> => {
  const context = async (ctx: NextPageContext): Promise<GqlContext> => {
    try {
      const session = await unstable_getServerSession(
        ctx.req as any,
        ctx.res as any,
        authOptions
      )
      if (!session) {
        throw new Error('Missing session!')
      }
      const email = session.user.email
      const userRepo = getRepository(User)
      const user = await userRepo.findOne({ where: { email } })
      if (!user) throw new Error(`No user found for email ${email}`)
      return { ...ctx, session, user }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const schema = await buildSchema({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: Object.values(resolvers) as NonEmptyArray<ClassType<any>>,
  })
  const server = new ApolloServer({
    schema,
    context,
  })
  const handleRequest = server.getRequestHandler({ baseUrl: '/api/graphql' })
  return { handleRequest }
}

export default bootstrap
