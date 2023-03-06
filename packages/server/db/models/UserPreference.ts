import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';
import { Theme } from './Theme';

@Table({ tableName: 'user_preferences' })
export class UserPreference extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => Theme)
  @Column(DataType.INTEGER)
  theme_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Theme)
  theme!: Theme;
}

