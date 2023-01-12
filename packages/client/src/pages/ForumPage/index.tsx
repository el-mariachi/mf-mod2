import AddForumTopicForm from '../../components/AddForumTopicForm/AddForumTopicForm'
import AppDefaultTpl from '../../components/AppDefaultTpl'
import ForumTopicsList from '../../components/ForumTopicsList'
import './ForumPage.scss'

function ForumPage() {
  return (
    <AppDefaultTpl showNav={true} className="forum-page">
      <h1 className="h3 mb-4">Игровой форум</h1>
      <AddForumTopicForm />
      <ForumTopicsList />
    </AppDefaultTpl>
  )
}

export default ForumPage
