import { authorizedPageAccessOpts, LoggedInCheck } from 'hoc/LoggedInCheck'
import AppDefaultTpl from '@components/AppDefaultTpl'
import './ForumPage.scss'
import { Outlet } from 'react-router-dom'


function ForumPage() {


  return (
    <AppDefaultTpl className="forum-page">
      <h1 className="h3 mb-4">Игровой форум</h1>
      <Outlet />
    </AppDefaultTpl>
  )
}
export default LoggedInCheck(authorizedPageAccessOpts)(ForumPage)
