export enum LoadingStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export enum Logged {
  In = 'In',
  Out = 'Out',
}

export type UserSlice = {
  loadingStatus: LoadingStatus
  loginStatus: Logged
  data: {
    id: number
    email: string
    login: string
    second_name: string
    first_name: string
    display_name: string
    phone: string
    avatar: string
  }
}

export const userInitialState: UserSlice = {
  loadingStatus: LoadingStatus.Idle,
  loginStatus: Logged.Out,
  data: {
    id: 0,
    email: '',
    login: '',
    second_name: '',
    first_name: '',
    display_name: '',
    phone: '',
    avatar: 'https://cdn-icons-png.flaticon.com/512/5953/5953714.png',
  },
}
