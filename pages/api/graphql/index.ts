import { NextApiRequest, NextApiResponse } from 'next'
import { withDb } from '~lib/api'
import getGraphqlServer from '~/apolloServer'

export default withDb(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const graphql = await getGraphqlServer()
    return graphql.handleRequest(req, res)
  } catch (err) {
    console.error(err)
    throw err
  }
})
