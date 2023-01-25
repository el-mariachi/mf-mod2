import { FC, ButtonHTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

export type SpinnerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean
  spinnerText?: string
}
const SpinnerButton: FC<SpinnerButtonProps> = ({
  children,
  spinnerText,
  loading,
  ...props
}) => {
  if (!spinnerText) {
    spinnerText = 'Секундочку'
  }
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          {` ${spinnerText}...`}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
export default SpinnerButton
