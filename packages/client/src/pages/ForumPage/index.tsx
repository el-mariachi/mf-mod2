import { useState } from 'react'
import { authorizedPageAccessOpts, LoggedInCheck } from 'hoc/LoggedInCheck'
import AppDefaultTpl from '@components/AppDefaultTpl'
import ForumTopicsList from '@components/ForumTopicsList'
import AddForumTopicForm from '@components/AddForumTopicForm'
import ForumTopicDetail from '@components/ForumTopicDetail'
import avatar from '@images/king.png'
import './ForumPage.scss'

// TODO for mock nav
enum mockForumPages {
  list = 'list',
  add = 'add',
  topic = 'topic',
}
function ForumPage() {
  const [mockForumPage, setMockForumPage] = useState(mockForumPages.list)

  return (
    <AppDefaultTpl className="forum-page">
      <h1 className="h3 mb-4">Игровой форум</h1>
      {mockForumPages.topic == mockForumPage ? (
        <ForumTopicDetail
          mock2list={() => setMockForumPage(mockForumPages.list)}
          author="Петр"
          avatar={avatar}
          isOwner={true}
          title="Тема от Петра"
          dateCreate={new Date(2023, 0, 18, 12, 5)}
          msgCount={6}
          dateLastMsg={new Date(2023, 2, 10, 18, 45)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nam
          suscipit nisi minima beatae quis, debitis nemo dolore ratione
          exercitationem dolores rerum impedit natus totam veniam est
          laboriosam. Doloribus, obcaecati
        </ForumTopicDetail>
      ) : mockForumPages.add == mockForumPage ? (
        <AddForumTopicForm
          mock2topic={() => setMockForumPage(mockForumPages.topic)}
          mock2list={() => setMockForumPage(mockForumPages.list)}
        />
      ) : (
        <ForumTopicsList
          mock2addTopic={() => setMockForumPage(mockForumPages.add)}
          mock2topic={() => setMockForumPage(mockForumPages.topic)}
        />
      )}
    </AppDefaultTpl>
  )
}
export default LoggedInCheck(authorizedPageAccessOpts)(ForumPage)
