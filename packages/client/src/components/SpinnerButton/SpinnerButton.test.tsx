import SpinnerButton from './index'
import { render, screen, fireEvent } from '@testing-library/react'

describe('#SpinnerButton', () => {
  it('should create', () => {
    const renderedSpinnerButton = render(<SpinnerButton loading />)
    expect(renderedSpinnerButton).toBeTruthy()
    renderedSpinnerButton.unmount()
  })
  it('should rendered', async () => {
    render(<SpinnerButton loading />)
    await screen.findByRole('button')
    expect(screen.getByRole('button')).toHaveTextContent('hello there')
  })
})
