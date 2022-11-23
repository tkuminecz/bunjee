import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { App } from './App'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  email!: string

  @OneToMany(() => App, (app) => app.user)
  apps: Promise<App[]>
}
