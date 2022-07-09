import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { Connection } from 'typeorm'
import { createDbConnection } from '~/db'

export const withErrorHandler = <T>(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => unknown | Promise<unknown>
): NextApiHandler<T> => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await handler(req, res)
    } catch (err) {
      console.error(err)
      res.status(err.status || 500)
      res.send(err.message)
      res.end()
    }
  }
}

export const withDb = <T>(
  doWork: (
    req: NextApiRequest,
    res: NextApiResponse,
    conn: Connection
  ) => unknown | Promise<unknown>
): NextApiHandler<T> => {
  return async (req, res: NextApiResponse) => {
    const connection = await createDbConnection()
    try {
      await doWork(req, res, connection)
    } finally {
      await connection.close()
    }
  }
}
