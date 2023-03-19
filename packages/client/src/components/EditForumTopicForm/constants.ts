import { minMax } from '@utils/validations'

const inputData = [
  {
    name: 'title',
    label: 'Название',
    type: 'text',
    placeholder: 'Назовите тему',
    validate: { minMax: minMax(3, 64) },
  },
  {
    name: 'content',
    label: 'Содержимое',
    type: 'textarea',
    placeholder: 'Раскройте тему',
    validate: { minMax: minMax(3, 2048) },
  },
] as const

export type ForumTopicFields = (typeof inputData)[number]['name']
export type ForumTopicStruct = Record<ForumTopicFields, string>

const defaultValues: ForumTopicStruct = {
  title: '',
  content: '',
}

export { inputData, defaultValues }
