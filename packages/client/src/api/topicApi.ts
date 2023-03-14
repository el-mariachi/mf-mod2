import { restTopicApi } from '@api/index'

export const getTopics = () => restTopicApi.get<Topic[]>('/')

export const getTopic = (id: number) => restTopicApi.get<Topic>(`/${id}`)

export const createTopic = (title: string) =>
  restTopicApi.post<Topic>('/', { title })

export const updateTopic = (topic: Topic) =>
  restTopicApi.put<Topic>(`/${topic.id}`, topic)

export const deleteTopic = (id: number) => restTopicApi.delete(`/${id}`)

export default { getTopics, getTopic, createTopic, updateTopic, deleteTopic }
