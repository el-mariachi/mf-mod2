import AddForumTopicForm from '../../components/AddForumTopicForm/AddForumTopicForm'
import ForumTopicsList from '../../components/ForumTopicsList/ForumTopicsList'
import './ForumPage.scss'

function ForumPage() {
  return (
    <section className="forum-page page d-flex flex-column">
      <AddForumTopicForm />
      <ForumTopicsList />
    </section>
  )
}

export default ForumPage
