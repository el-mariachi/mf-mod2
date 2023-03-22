import commentApi from '@api/commentApi'
import { apiErrorHandler } from '@utils/errorsHandling'

const getComment = (id: number) => commentApi.getComment(id)

const getComments = (topicId: number) =>
  commentApi.getComments(topicId)

const createComment = (comment: Partial<TopicComment>) =>
  commentApi.createComment(comment).catch(error => apiErrorHandler(error))

const updateComment = (comment: TopicComment) =>
  commentApi.updateComment(comment).catch(error => apiErrorHandler(error))

const deleteComment = (id: number) =>
  commentApi.deleteComment(id).catch(error => apiErrorHandler(error))

export { getComment, getComments, createComment, updateComment, deleteComment }
