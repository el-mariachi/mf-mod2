import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { addTopic } from '@store/slices/forum'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

function AddForumTopicForm() {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTopic(title))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <div className="overflow-hidden p-1 pe-0">
      <Form
        onSubmit={handleSubmit}
        className="add-topic-form form d-flex gap-2 float-end">
        <Form.Group onChange={handleChange} controlId="formNewTopic">
          <Form.Control type="text" placeholder="Название новой темы" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Создать тему
        </Button>
      </Form>
    </div>
  )
}

export default AddForumTopicForm
