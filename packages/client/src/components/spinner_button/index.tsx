import { FC, ButtonHTMLAttributes } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

type SpinnerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean
  spinnerText?: string
}
const SpinnerButton: FC<SpinnerButtonProps> = ({ children, ...props }) => {
  if (!props.spinnerText) {
    props.spinnerText = 'Секундочку'
  }
  return (
    <Button type="submit" disabled={props.loading}>
      {props.loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          {` ${props.spinnerText}...`}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
export default SpinnerButton
