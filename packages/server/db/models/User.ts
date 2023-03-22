import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  HasOne,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript'
import { UserTheme } from '@models/UserTheme'
import { Topic } from './Topic'
import { Comment } from './Comment'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'users',
})

export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare yandex_id: number

  @Column(DataType.VIRTUAL)
  get user_name(): string {
    return this.getDataValue('display_name') || this.getDataValue('login')
  }
  set user_name(value: string) {
    this.setDataValue('user_name', value)
  }

  @AllowNull(false)
  @Column
  login!: string

  @Column
  display_name!: string

  @Column
  avatar!: string

  @HasOne(() => UserTheme)
  declare user_theme: number

  @HasMany(() => Topic)
  topics!: Topic[]

  @HasMany(() => Comment)
  messages!: Comment[]  
}  
