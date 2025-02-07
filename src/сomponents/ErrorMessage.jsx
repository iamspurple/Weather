import { GoAlertFill } from "react-icons/go"

const ErrorMessage = () => {
  return (
    <div className="error">
      <div className="error-message">
        <GoAlertFill className="error-icon" size={40} color="red"/>
        <span>Something went wrong, please try again!</span>
      </div>
    </div>
  )
}

export default ErrorMessage
