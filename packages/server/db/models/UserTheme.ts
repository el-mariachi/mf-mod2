import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { User } from '@models/User'
import { Theme } from '@models/Theme'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'user_theme',
})
export class UserTheme extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare user_id: number

  @ForeignKey(() => Theme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare theme_id: number

  @BelongsTo(() => Theme)
  declare theme: Theme
}
