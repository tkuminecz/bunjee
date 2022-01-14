import {
  Resolver,
  Query,
  Root,
  Arg,
  FieldResolver,
  Mutation,
} from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import {
  RedirectUri,
  CreateRedirectUri,
  UpdateRedirectUri,
} from '~/models/RedirectUri'
import { App } from '~/models/App'

@Resolver(() => RedirectUri)
export class RedirectUriResolver {
  get redirectUriRepo(): Repository<RedirectUri> {
    return getRepository(RedirectUri)
  }

  @Query(() => [RedirectUri])
  async redirectUris(): Promise<RedirectUri[]> {
    return this.redirectUriRepo.find()
  }

  @Query(() => RedirectUri)
  async redirectUri(@Arg('id') id: string): Promise<RedirectUri> {
    return this.redirectUriRepo.findOneOrFail(id)
  }

  @FieldResolver(() => App)
  app(@Root() redirectUri: RedirectUri): Promise<App> {
    return redirectUri.app
  }

  @Mutation(() => RedirectUri)
  async createRedirectUri(
    @Arg('data') data: CreateRedirectUri
  ): Promise<RedirectUri> {
    const redirectUri = this.redirectUriRepo.create(data)
    const app = await getRepository(App).findOneOrFail(data.appId)
    redirectUri.app = Promise.resolve(app)
    return this.redirectUriRepo.save(redirectUri)
  }

  @Mutation(() => RedirectUri)
  async updateRedirectUri(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRedirectUri
  ): Promise<RedirectUri> {
    const redirectUri = await this.redirectUriRepo.findOneOrFail(id)
    redirectUri.uri = data.uri
    return this.redirectUriRepo.save(redirectUri)
  }

  @Mutation(() => RedirectUri)
  async deleteRedirectUri(@Arg('id') id: string): Promise<RedirectUri> {
    const redirectUri = await this.redirectUriRepo.findOneOrFail(id)
    await this.redirectUriRepo.remove(redirectUri)
    return { ...redirectUri, id }
  }
}
