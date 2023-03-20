import commentApi from '@api/commentApi'
import { apiErrorHandler } from '@utils/errorsHandling'

const getComment = (id: number) => 
  commentApi.getComment(id).catch(error => apiErrorHandler(error))

const getComments = (topicId: number) =>
  commentApi.getComments(topicId).catch(error => apiErrorHandler(error))

const createComment = (comment: Partial<TopicComment>) =>
  commentApi.createComment(comment).catch(error => apiErrorHandler(error))

const updateComment = (comment: TopicComment) =>
  commentApi.updateComment(comment).catch(error => apiErrorHandler(error, true))

const deleteComment = (id: number) =>
  commentApi.deleteComment(id).catch(error => apiErrorHandler(error, true))

export { getComment, getComments, createComment, updateComment, deleteComment }
