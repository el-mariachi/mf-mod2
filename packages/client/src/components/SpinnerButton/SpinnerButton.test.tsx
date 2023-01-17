import SpinnerButton from './index'
import { render, screen } from '@testing-library/react'
describe('#SpinnerButton', () => {
  it('should create', () => {
    const renderedSpinner = render(<SpinnerButton loading />)
    expect(renderedSpinner).toBeTruthy()
  })
})
