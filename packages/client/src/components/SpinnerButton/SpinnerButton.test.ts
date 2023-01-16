import React from 'react'
import renderer from 'react-test-renderer'
import { expect, it } from '@jest/globals'
import SpinnerButton from '@components/SpinnerButton'
import { render } from 'react-dom'

it('hello jest', () => {
  console.log(renderer)
  // const spinnerButton = renderer
  //   .create(<SpinnerButton loading></SpinnerButton>)
  //   .toJSON()
  // expect(spinnerButton).toMatchSnapshot()
})
