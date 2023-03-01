import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  Unique,
  HasMany,
} from 'sequelize-typescript'
import { User } from './user.model'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'themes',
})
export class Theme extends Model {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare theme: string

  @HasMany(() => User, {
    onDelete: 'SET DEFAULT', // Options for associations update
  })
  declare users: User[]
}
