import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, InputType } from 'type-graphql';
import { App } from './App';

@Entity()
@ObjectType()
export class RedirectUri {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  uri: string;

  @ManyToOne(() => App, app => app.redirectUris, {
    onDelete: 'CASCADE',
  })
  app: Promise<App>;
}

@InputType()
export class CreateRedirectUri {
  @Field()
  uri: string;

  @Field()
  appId: string;
}

@InputType()
export class UpdateRedirectUri {
  @Field()
  uri: string;
}
