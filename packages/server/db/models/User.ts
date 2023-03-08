import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript'
import { UserTheme } from './UserTheme'

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

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare login: string

  @HasOne(() => UserTheme)
  declare user_theme: number
}
