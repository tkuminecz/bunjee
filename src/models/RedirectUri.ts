import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { App } from './App';

@Entity()
export class RedirectUri {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  uri!: string;

  @ManyToOne(() => App, app => app.redirectUris)
  app: Promise<App>;
}
