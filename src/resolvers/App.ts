import { getRepository } from 'typeorm';
import { Query, Resolver } from 'type-graphql';
import { App } from '~/models/App';

@Resolver(() => App)
export class AppResolver {
  @Query(() => [App])
  async apps(): Promise<App[]> {
    const appRepo = getRepository(App);
    return appRepo.find();
  }
}
