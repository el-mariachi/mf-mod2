import {
  DataType,
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'

import { User } from './User'
import { Comment } from './Comment'

@Table({
  tableName: 'topics',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Topic extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @BelongsTo(() => User)
  user!: User

  @HasMany(() => Comment, 'topic_id')
  comments!: Comment[]
}
