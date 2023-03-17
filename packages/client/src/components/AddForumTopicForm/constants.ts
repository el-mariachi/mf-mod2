import { minMax } from '@utils/validations'

const inputData = [
  {
    name: 'topic_name',
    label: 'Название',
    type: 'text',
    placeholder: 'Назовите тему',
    validate: { minMax: minMax(3, 64) },
  },
  {
    name: 'topic_text',
    label: 'Содержимое',
    type: 'textarea',
    placeholder: 'Раскройте тему',
    validate: { minMax: minMax(3, 2048) },
  },
] as const

export type ForumTopicFields = (typeof inputData)[number]['name']
export type ForumTopicStruct = Record<ForumTopicFields, string>

const defaultValues: ForumTopicStruct = {
  topic_name: '',
  topic_text: '',
}

export { inputData, defaultValues }
