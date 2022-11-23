import { MiddlewareFn } from 'type-graphql'
import { NextContext } from '@tkuminecz/apollo-server-next/dist/ApolloServer'

export const AuthMiddleware: MiddlewareFn<NextContext> = async (
  params,
  next
) => {
  return next()
}
