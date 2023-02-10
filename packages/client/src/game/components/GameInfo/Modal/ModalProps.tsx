import { ReactNode } from 'react'

export default interface ModalProps {
  active: boolean
  children: ReactNode
  close: () => void
  title: string
}
