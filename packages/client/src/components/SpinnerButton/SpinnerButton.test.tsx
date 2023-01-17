// import React from 'react'
// import * as renderer from 'react-test-renderer'
// import { expect, it } from '@jest/globals'
import SpinnerButton from './index'
import NewComponent from './NewComponent'
import { render, screen } from '@testing-library/react'

// it('hello jest', () => {
//   console.log(renderer)
//   const spinnerButton = renderer
//     .create(<SpinnerButton loading></SpinnerButton>)
//     .toJSON()
//   expect(spinnerButton).toMatchSnapshot()
// })
// it('hello jest', () => {
//   const newComponent = renderer.create(<NewComponent />).toJSON()
//   console.log(newComponent)
// })

it('render SpinnerButton', () => {
  const renderedSpinner = render(<SpinnerButton loading />)
  console.log(renderedSpinner)
})
it('render newComponent', () => {
  const renderedNew = render(<NewComponent />)
  console.log(renderedNew)
})
