import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RedirectUri } from './RedirectUri';
import { User } from './User';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.apps)
  user: Promise<User>;

  @OneToMany(() => RedirectUri, redirectUri => redirectUri.app)
  redirectUris: Promise<RedirectUri[]>;
}
