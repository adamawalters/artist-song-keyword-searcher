
type ErrorAlertProps = {
    error: {
        message: string
    }
}

const ErrorAlert = ({error}: ErrorAlertProps) => {
  return (
    <div>{error.message}</div>
  )
}

export default ErrorAlert