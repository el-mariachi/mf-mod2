import { restCommentApi } from '@api/index'

export const getComments = (topicId: number) =>
  restCommentApi.get<TopicComment[]>(`/?topic_id=${topicId}`)

export const getComment = (id: number) =>
  restCommentApi.get<TopicComment>(`/${id}`)

export const createComment = (comment: Partial<TopicComment>) =>
  restCommentApi.post<TopicComment>('/', comment)

export const updateComment = (comment: TopicComment) =>
  restCommentApi.put<TopicComment>(`/${comment.id}`, comment)

export const deleteComment = (id: number) => restCommentApi.delete(`/${id}`)

export default {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
}
