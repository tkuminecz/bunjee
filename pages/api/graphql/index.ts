import { NextApiRequest, NextApiResponse } from 'next'
import { withDb } from '~lib/api'
import getGraphqlServer from '~/apolloServer'

const graphqlServerPromise = getGraphqlServer()

export default withDb(async (req: NextApiRequest, res: NextApiResponse) => {
  const graphql = await graphqlServerPromise
  return graphql.handleRequest(req, res)
})
