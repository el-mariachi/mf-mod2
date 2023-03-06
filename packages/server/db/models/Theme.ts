import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  Unique,
  Index,
  HasMany,
} from 'sequelize-typescript'
import { UserPreference } from './UserPreference'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'themes',
})
export class Theme extends Model {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  @Index
  declare name: string

  @HasMany(() => UserPreference, 'id')
  user_themes!: UserPreference
}
