/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormControl from './index'
import { render, screen } from '@testing-library/react'

describe('#FormControl', () => {
  const registerCallbackStub = () => {}
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
  it('prop formName should be applied to label and input', () => {
    const { container } = render(
      <FormControl
        formName={'testName'}
        controlProps={{
          name: 'name',
          label: 'label',
          type: 'type',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    const label = container.querySelector('label')
    expect(label?.htmlFor).toBe('testName-name')
    const input = container.querySelector('input')
    expect(input?.id).toBe('testName-name')
  })
  it('prop name should be applied to label and input as -suffix', () => {
    const { container } = render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'testName',
          label: 'label',
          type: 'type',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    const label = container.querySelector('label')
    expect(label?.htmlFor).toBe('formName-testName')
    const input = container.querySelector('input')
    expect(input?.id).toBe('formName-testName')
  })
  it('prop label should be applied to label as text', () => {
    const { container } = render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'name',
          label: 'testLabel',
          type: 'type',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    const label = container.querySelector('label')
    expect(label?.textContent).toBe('testLabel')
  })
  it('prop type should be applied to input as type', () => {
    const { container } = render(
      <FormControl
        formName={'formName'}
        controlProps={{
          name: 'name',
          label: 'label',
          type: 'checkbox',
        }}
        register={registerCallbackStub as any}
        errors={[123] as any}
      />
    )
    const input = container.querySelector('input')
    expect(input?.type).toBe('checkbox')
  })
})
