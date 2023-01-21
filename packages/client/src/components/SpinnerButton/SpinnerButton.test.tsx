import SpinnerButton from './index'
import { render, screen } from '@testing-library/react'

describe('#SpinnerButton', () => {
  it('should create', () => {
    const renderedSpinnerButton = render(<SpinnerButton loading />)
    expect(renderedSpinnerButton).toBeTruthy()
  })
  it('should be rendered with default text if text not provided in props', () => {
    render(<SpinnerButton loading />)
    expect(screen.getByRole('button')).toHaveTextContent('Секундочку')
  })
  it('should be rendered with text from props', () => {
    render(<SpinnerButton loading spinnerText="Минуточку" />)
    expect(screen.getByRole('button')).toHaveTextContent('Минуточку')
  })
  it('should be disabled if loading true', () => {
    render(<SpinnerButton loading />)
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })
  it('spinner should be rendered if loading true', () => {
    const { container } = render(<SpinnerButton loading />)
    const span = container.querySelector('span')
    expect(span).toBeTruthy()
  })
  it('spinner should not be rendered if loading false', () => {
    const { container } = render(<SpinnerButton loading={false} />)
    const span = container.querySelector('span')
    expect(span).toBe(null)
  })
})
