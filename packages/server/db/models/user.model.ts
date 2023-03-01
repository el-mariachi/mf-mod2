import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  Default,
  BelongsTo,
} from 'sequelize-typescript'
import { Theme } from './theme.model'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'users',
})
export class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare user_name: string

  @AllowNull(false)
  @ForeignKey(() => Theme)
  @Default(1)
  @Column(DataType.INTEGER)
  declare theme_id: number

  @BelongsTo(() => Theme)
  declare theme: Theme
}
