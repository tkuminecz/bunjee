import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType, InputType } from 'type-graphql';
import { RedirectUri } from './RedirectUri';
import { User } from './User';

@Entity()
@ObjectType()
export class App {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  secret: string;

  @ManyToOne(() => User, user => user.apps)
  user: Promise<User>;

  @OneToMany(() => RedirectUri, redirectUri => redirectUri.app)
  redirectUris: Promise<RedirectUri[]>;
}

@InputType()
export class CreateApp {
  @Field()
  name: string;
}
