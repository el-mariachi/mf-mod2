import { DataType, AllowNull, BelongsTo, Column, ForeignKey, Model, Default, Table } from 'sequelize-typescript';

import { Topic } from './Topic';
import { User } from './User';

@Table({ tableName: 'comments', createdAt: 'created_at', updatedAt: 'updated_at' })
export class Comment extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topic_id!: number;

  @ForeignKey(() => Comment)
  @AllowNull
  @Default(null)
  @Column(DataType.INTEGER)
  comment_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  text!: string;

  @BelongsTo(() => Topic, 'topic_id')
  topic!: Topic;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Comment)
  comment!: Comment;
}
