import 'reflect-metadata'
import { ApolloServer } from '@tkuminecz/apollo-server-next'
import { NextPageContext } from 'next'
import { buildSchema, ClassType, NonEmptyArray } from 'type-graphql'
import { getRepository } from 'typeorm'
import { NextApiHandler } from 'next'
import { getAuth0 } from '~/auth0'
import { User } from './models/User'
import * as resolvers from '~/resolvers'

export interface GqlContext extends NextPageContext {
  accessToken: string
  idToken: string
  user: User
}

interface ApolloServerModule {
  handleRequest: NextApiHandler
}

const bootstrap = async (): Promise<ApolloServerModule> => {
  const context = async (ctx: NextPageContext): Promise<GqlContext> => {
    const auth0 = await getAuth0()
    const session = await auth0.getSession(ctx.req)
    const tokenCache = await auth0.tokenCache(ctx.req, ctx.res)
    const { accessToken } = await tokenCache.getAccessToken()
    const idToken = session?.idToken
    if (!accessToken || !idToken) {
      throw new Error('Missing accessToken or idToken!')
    }
    const {
      user: { email },
    } = session
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({ where: { email } })
    if (!user) throw new Error(`No user found for email ${email}`)
    return { ...ctx, accessToken, idToken, user }
  }

  const schema = await buildSchema({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: Object.values(resolvers) as NonEmptyArray<ClassType<any>>,
  })
  const server = new ApolloServer({
    schema,
    context,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  })
  const handleRequest = server.getRequestHandler({ baseUrl: '/api/graphql' })
  return { handleRequest }
}

export default bootstrap
