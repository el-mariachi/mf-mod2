/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react'
import FormGroupView from '.'

describe('#FormGroupView', () => {
  it('SFormGroupView should to match snapshot', () => {
    const registerCallbackStub = () => {}
    const { baseElement } = render(
      <FormGroupView
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
})
