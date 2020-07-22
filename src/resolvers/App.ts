import { getRepository, Repository } from 'typeorm';
import { Arg, Query, Resolver, Mutation, Ctx } from 'type-graphql';
import { App, CreateApp } from '~/models/App';
import { generateSecret } from '~/crypt';
import type { GqlContext } from '~/graphql';

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

  @Mutation(() => App)
  async createApp(
    @Arg('data') data: CreateApp,
    @Ctx() ctx: GqlContext
  ): Promise<App> {
    const entity = this.appRepo.create(data);
    entity.secret = await generateSecret(Date.now().toString());
    entity.user = Promise.resolve(ctx.user);
    return this.appRepo.save(entity);
  }

  @Mutation(() => App)
  async deleteApp(@Arg('id') id: string): Promise<App> {
    const entity = await this.appRepo.findOneOrFail(id);
    return this.appRepo.remove(entity);
  }
}
