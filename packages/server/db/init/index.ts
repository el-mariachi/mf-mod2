import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
dotenv.config()

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [__dirname + '/../models'],
}

// Create Sequelize instance
export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync() // Creates/updates tables in db
    console.log('✅ DB Connection successful')
  } catch (e) {
    console.error('❌ DB Connection error:', e)
  }
}
