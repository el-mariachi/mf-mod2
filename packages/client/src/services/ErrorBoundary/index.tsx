import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}
interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }
  static getDerivedStateFromError(): State {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Ошибка:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так</h1>
    }
    return this.props.children
  }
}
export default ErrorBoundary
