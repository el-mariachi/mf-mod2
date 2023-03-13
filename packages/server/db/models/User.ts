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
import { UserPreference } from './UserPreference'
import { Topic } from './Topic'
import { Comment } from './Comment'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  yandex_id!: number

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

  @HasOne(() => UserPreference)
  user_preference!: UserPreference

  @HasMany(() => Topic)
  topics!: Topic[]

  @HasMany(() => Comment)
  messages!: Comment[]
}
