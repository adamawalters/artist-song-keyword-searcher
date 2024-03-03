
type ErrorAlertProps = {
    error: {
        message: string
    }
}

const ErrorAlert = ({error}: ErrorAlertProps) => {
  console.log(`ErrrorAlert`)
  return (
    <div>{error.message}</div>
  )
}

export default ErrorAlert