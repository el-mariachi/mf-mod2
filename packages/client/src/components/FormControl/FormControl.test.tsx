/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormControl from './index'
import { render, screen } from '@testing-library/react'

describe('#FormControl', () => {
  it('should create', () => {
    const registerStub = () => {}
    const renderedFormControl = render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'name',
          label: 'label',
          type: 'type',
        }}
        register={registerStub as any}
        errors={[123] as any}
      />
    )
    expect(renderedFormControl).toBeTruthy()
  })
})
