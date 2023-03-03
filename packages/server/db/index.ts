import { dbConnect } from './init'
import { Theme } from './models/Theme'
// import { User } from './models/User'

async function getAllThemes() {
  return Theme.findAll()
}
async function createTheme(theme: string) {
  return Theme.create({ theme })
}
async function clearThemes() {
  return Theme.destroy({ truncate: true })
}
/*
async function getAllUsers() {
  return User.findAll()
}
async function getUserById(id: number) {
  return User.findOne({ where: { id } })
}
async function getUsersByName(user_name: string) {
  return User.findAll({ where: { user_name } })
}
async function deleteUserById(id: number) {
  return User.destroy({ where: { id } })
}
async function getThemeById(id: number) {
  return Theme.findOne({ where: { id } })
}
async function getThemeByName(theme: string) {
  return Theme.findOne({ where: { theme } })
}
*/
export async function startApp(callback: () => void) {
  await dbConnect()
  await callback() // In this example it's starting the express server

  // clear themes with id > 1
  // not allowed to delete all records here since there's a foreign key that refers to themes
  // and is set to default value of 1 on delete
  try {
    await clearThemes()
  } catch (error) {
    console.error('⛔️ Cannot delete records', error)
  }
  let themes: { theme: string }[]
  themes = (await getAllThemes()).map(({ theme }) => ({ theme }))
  console.log('Список тем из БД:', themes)
  console.log('Добавим пару тем: main & develop')
  try {
    // Если не использовать try/catch, то приложение падает:
    // нельзя добавить запись с именем, которое уже есть в базе, если выставлен UNIQUE
    await createTheme('main')
  } catch (error) {
    console.error('⛔️ Cannot add theme main', error)
  }
  try {
    await createTheme('develop')
  } catch (error) {
    console.log('⛔️ Cannot add theme develop', error)
  }
  themes = (await getAllThemes()).map(({ theme }) => ({ theme }))
  console.log('Список тем из БД:', themes)
}
