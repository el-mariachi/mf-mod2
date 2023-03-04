import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  Unique,
  Index,
  HasOne,
} from 'sequelize-typescript'
import { UserTheme } from './UserTheme'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'themes',
})
export class Theme extends Model {
  @Index
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare theme: string

  @Column(DataType.STRING)
  declare description: string

  @HasOne(() => UserTheme)
  declare user_id: number
}
