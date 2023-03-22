import { restTopicApi } from '@api/index'

export const getTopics = (page = 1) =>
  restTopicApi.get<{ count: number; rows: Topic[] }>(`/?page=${page}`)

export const getTopic = (id: number) => restTopicApi.get<Topic>(`/${id}`)

export const createTopic = (topic: Partial<Topic>) =>
  restTopicApi.post<Topic>('/', topic)

export const updateTopic = (topic: Topic) =>
  restTopicApi.put<Topic>(`/${topic.id}`, topic)

export const deleteTopic = (id: number) => restTopicApi.delete(`/${id}`)

export default { getTopics, getTopic, createTopic, updateTopic, deleteTopic }
