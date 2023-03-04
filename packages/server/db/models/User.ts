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
  @Column({ type: DataType.STRING, comment: 'display_name' })
  declare user_name: string

  @HasOne(() => UserTheme)
  declare theme_id: number
}
