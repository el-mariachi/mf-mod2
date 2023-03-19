import topicApi from '@api/topicApi'
import { apiErrorHandler } from '@utils/errorsHandling'

const getTopic = (id: number) =>
  topicApi.getTopic(id).catch(error => apiErrorHandler(error))

const getTopics = (page = 1) =>
  topicApi.getTopics(page).catch(error => apiErrorHandler(error))

const createTopic = (topic: Partial<Topic>) =>
  topicApi.createTopic(topic).catch(error => apiErrorHandler(error))

const updateTopic = (topic: Topic) =>
  topicApi.updateTopic(topic).catch(error => apiErrorHandler(error))

const deleteTopic = (id: number) =>
  topicApi.deleteTopic(id).catch(error => apiErrorHandler(error))

export { getTopic, getTopics, createTopic, updateTopic, deleteTopic }
