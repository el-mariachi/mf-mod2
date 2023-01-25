/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormControl from './index'
import { render, screen } from '@testing-library/react'

describe('#FormControl', () => {
  const registerCallbackStub = () => {}
  it('FormControl should to match snapshot', () => {
    const { baseElement } = render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'name',
          label: 'label',
          type: 'type',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should create', () => {
    const renderedFormControl = render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'name',
          label: 'label',
          type: 'type',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    expect(renderedFormControl).toBeTruthy()
  })
  it('prop label should be applied as label text', () => {
    render(
      <FormControl
        formName={'testName'}
        controlProps={{
          name: 'name',
          label: 'testLabel',
          type: 'type',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    expect(screen.getByLabelText('testLabel')).toBeInTheDocument()
  })

  it('prop placeholder should be applied to input as placeholder', () => {
    render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'name',
          label: 'label',
          type: 'type',
          placeholder: 'testPlaceholder',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    expect(screen.getByPlaceholderText('testPlaceholder')).toBeInTheDocument()
  })
})
