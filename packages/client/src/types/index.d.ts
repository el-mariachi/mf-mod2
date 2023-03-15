import { LeaderboardDataResp } from '@api/leaderboardApi'

declare global {
  export type User = {
    id: number
    login: string
    first_name: string
    second_name: string
    display_name: string
    avatar: string
    phone: string
    email: string
  }

  interface Array<T> {
    customSort(
      arr: LeaderboardDataResp[],
      sortVal: SortedVal
    ): LeaderboardDataResp[]
  }

  type UserDTO = {
    id: number
    login: string
    firstName: string
    secondName: string
    displayName: string
    avatar: string
    phone: string
    email: string
  }

  type ProfileFormProps = Omit<User, 'id' | 'avatar'> & {
    password?: string
  }

  type ProfileInputProps = {
    type: string
    name: string
    placeholder?: string
    value: string
    label: string
  }

  type ControlProps = {
    name: FieldName
    label: string
    message?: string
    type: string
    placeholder?: string
    test?: RegExp
    validate?: Validate | Record<string, Validate>
  }

  export type ProfileData = Omit<User, 'id' | 'avatar'>

  export type ProfileDataT = Omit<UserT, 'id' | 'avatar'>

  export type Chat = {
    id: number
    title: string
    avatar: string
    unread_count: number
    last_message: {
      user: User
      time: string
      content: string
    }
  }

  export type ChatT = {
    id: number
    title: string
    avatar: string
    unreadCount: number
    lastMessage: {
      user: User
      time: string
      content: string
    }
  }

  enum messageType {
    'file',
    'message',
  }

  export type File = {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }

  export type Message = {
    id: number
    chat_id: number
    time: string
    type: messageType
    user_id: number
    content: string
    file?: File
  }

  export type MessageT = {
    chatId: number
    time: string
    type: messageType
    userId: number
    content: string
    file?: {
      id: number
      userId: number
      path: string
      filename: string
      contentType: string
      contentSize: number
      uploadDate: string
    }
  }

  export type SigninData = {
    login: string
    password: string
  }

  export type SignupData = {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
  }

  export type HttpResponse = {
    response: unknown
  }

  export type PasswordData = {
    oldPassword: string
    newPassword: string
  }

  export type FileData = {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }

  export type PlainObject<T = unknown> = {
    [key in string]: T
  }

  export type SceneProps = {
    onExit?: () => void
  }

  type RootStore = EnhancedStore<{
    game: GameSlice
    hero: HeroSlice
    user: UserSlice
  }>
  interface Window {
    __PRELOADED_STATE__?: RootStore
  }
}

export {}
