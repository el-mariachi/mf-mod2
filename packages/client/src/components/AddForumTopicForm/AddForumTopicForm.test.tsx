import { render } from '@testing-library/react'
import AddForumTopicForm from './index'

describe('#AddForumTopicForm', () => {
  it('AddForumTopicForm should to match snapshot', () => {
    const { baseElement } = render(<AddForumTopicForm />)
    expect(baseElement).toMatchSnapshot()
  })
})
