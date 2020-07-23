import { getRepository, Repository } from 'typeorm';
import {
  Arg,
  Query,
  Resolver,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { App, CreateApp, UpdateApp } from '~/models/App';
import { generateSecret } from '~/crypt';
import type { GqlContext } from '~/apolloServer';
import { RedirectUri } from '~/models/RedirectUri';

@Resolver(() => App)
export class AppResolver {
  get appRepo(): Repository<App> {
    return getRepository(App);
  }

  @Query(() => [App])
  async apps(): Promise<App[]> {
    return this.appRepo.find();
  }

  @Query(() => App)
  async app(@Arg('id') id: string): Promise<App> {
    return this.appRepo.findOneOrFail(id);
  }

  @FieldResolver(() => [RedirectUri])
  async redirectUris(@Root() app: App): Promise<RedirectUri[]> {
    return app.redirectUris;
  }

  @Mutation(() => App)
  async createApp(
    @Arg('data') data: CreateApp,
    @Ctx() ctx: GqlContext
  ): Promise<App> {
    const app = this.appRepo.create(data);
    app.secret = await generateSecret();
    app.user = Promise.resolve(ctx.user);
    return this.appRepo.save(app);
  }

  @Mutation(() => App)
  async updateApp(id: string, data: UpdateApp): Promise<App> {
    const app = await this.appRepo.findOneOrFail(id);
    app.name = data.name;
    return this.appRepo.save(app);
  }

  @Mutation(() => App)
  async refreshAppSecret(@Arg('id') id: string): Promise<App> {
    await this.appRepo.update(id, { secret: await generateSecret() });
    return this.appRepo.findOneOrFail(id);
  }

  @Mutation(() => App)
  async deleteApp(@Arg('id') id: string): Promise<App> {
    const app = await this.appRepo.findOneOrFail(id);
    await this.appRepo.remove(app);
    return { ...app, id };
  }
}
