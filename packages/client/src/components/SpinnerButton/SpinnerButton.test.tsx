import SpinnerButton from './index'
import { render, screen } from '@testing-library/react'

describe('#SpinnerButton', () => {
  it('should create', () => {
    const renderedSpinnerButton = render(<SpinnerButton loading />)
    expect(renderedSpinnerButton).toBeTruthy()
    renderedSpinnerButton.unmount()
  })
  it('should be rendered with Spinner if loading true', () => {
    const renderedSpinnerButton = render(<SpinnerButton loading />)
    expect(renderedSpinnerButton.getByText('Секундочку...')).toBeTruthy()
    renderedSpinnerButton.unmount()
  })
})
