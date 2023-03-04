import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript'
import { User } from './User'
import { Theme } from './Theme'

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
}
