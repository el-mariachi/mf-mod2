import commentApi from '@api/commentApi'
import { apiErrorHandler } from '@utils/errorsHandling'

const getComment = (id: number | undefined) => {
  const promise = id ? commentApi.getComment(id) : commentApi.getComments()
  return promise.catch(error => apiErrorHandler(error))
}

const createComment = (text: string, topic: Topic, parent?: TopicComment) => {
  const comment = {
    text,
    topic_id: topic.id,
    ...(parent && { parent_id: parent.id }),
  }
  commentApi.createComment(comment).catch(error => apiErrorHandler(error))
}

const updateComment = (comment: TopicComment) => {
  commentApi.updateComment(comment).catch(error => apiErrorHandler(error))
}

const deleteComment = (comment: TopicComment) => {
  commentApi.deleteComment(comment.id).catch(error => apiErrorHandler(error))
}

export { getComment, createComment, updateComment, deleteComment }
