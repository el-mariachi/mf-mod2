import AddForumTopicForm from '@components/AddForumTopicForm'
import AppDefaultTpl from '@components/AppDefaultTpl'
import ForumTopicsList from '@components/ForumTopicsList'
import './ForumPage.scss'
import { LoggedInCheck } from 'hoc/LoggedInCheck'
import type { LoggedInCheckOptions } from 'hoc/LoggedInCheck'
import ROUTES from '@constants/routes'

function ForumPage() {
  return (
    <AppDefaultTpl className="forum-page">
      <h1 className="h3 mb-4">Игровой форум</h1>
      <AddForumTopicForm />
      <ForumTopicsList />
    </AppDefaultTpl>
  )
}
const checkOptions: LoggedInCheckOptions = {
  userRequired: true,
  escapeRoute: ROUTES.SIGN_IN,
}

export default LoggedInCheck(checkOptions)(ForumPage)
