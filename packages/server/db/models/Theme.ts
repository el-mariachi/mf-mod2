import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  Unique,
  Index,
  HasOne,
  Length,
} from 'sequelize-typescript'
import { UserTheme } from '@models/UserTheme'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'themes',
})
export class Theme extends Model {
  @Index
  @Unique
  @AllowNull(false)
  @Length({ max: 20, msg: 'Name must be under 20 characters' })
  @Column(DataType.STRING)
  declare theme: string

  @Column(DataType.STRING)
  declare description: string

  @HasOne(() => UserTheme)
  declare user_theme: number
}
