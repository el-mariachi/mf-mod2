import { restCommentApi } from './restApi'

export const getComments = () => restCommentApi.get<TopicComment>('/')

export const getComment = (id: number) =>
  restCommentApi.get<TopicComment>(`/${id}`)

export const createComment = (comment: Omit<TopicComment, 'id' | 'user_id'>) =>
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
