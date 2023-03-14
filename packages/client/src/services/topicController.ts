import topicApi from '@api/topicApi'
import { apiErrorHandler } from '@utils/errorsHandling'

const getTopic = (id: number) => 
  topicApi.getTopic(id).catch(error => apiErrorHandler(error))


const getTopics = () => 
  topicApi.getTopics().catch(error => apiErrorHandler(error))


const createTopic = (title: string) =>
  topicApi.createTopic(title).catch(error => apiErrorHandler(error))

const updateTopic = (topic: Topic) => 
  topicApi.updateTopic(topic).catch(error => apiErrorHandler(error))


const deleteTopic = (topic: Topic) => {
  topicApi.deleteTopic(topic.id).catch(error => apiErrorHandler(error))
}

export { getTopic, getTopics, createTopic, updateTopic, deleteTopic }
