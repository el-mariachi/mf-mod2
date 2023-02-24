import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ROUTES from '@constants/routes'
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
    console.error('Ошибка в ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Что-то пошло не так.
          <Link to={ROUTES.ROOT}>Домой</Link>
        </h1>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
