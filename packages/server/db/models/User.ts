import { DataType, Model, Table, Column, AllowNull } from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'users',
})
export class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare user_name: string
}
