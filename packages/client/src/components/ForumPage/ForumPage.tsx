import AddForumTopicForm from '../AddForumTopicForm/AddForumTopicForm'
import ForumTopicsList from '../ForumTopicsList/ForumTopicsList'
import './ForumPage.scss'

function ForumPage() {
  return (
    <div className="wrapper">
      <AddForumTopicForm />
      <ForumTopicsList />
    </div>
  )
}

export default ForumPage
