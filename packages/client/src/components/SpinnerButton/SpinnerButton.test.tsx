import SpinnerButton from './index'
import { render, screen } from '@testing-library/react'

describe('#SpinnerButton', () => {
  it('should create', () => {
    const renderedSpinnerButton = render(<SpinnerButton loading />)
    expect(renderedSpinnerButton).toBeTruthy()
    renderedSpinnerButton.unmount()
  })
  it('should render with correct text', async () => {
    render(<SpinnerButton loading />)
    expect(screen.getByRole('button')).toHaveTextContent('Секундочку')
  })
  it('should render with correct text', async () => {
    render(<SpinnerButton loading />)
    expect(screen.getByRole('button')).toHaveTextContent('Пердулечку')
  })
})
