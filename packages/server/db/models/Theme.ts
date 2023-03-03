import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  Unique,
} from 'sequelize-typescript'

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
}
