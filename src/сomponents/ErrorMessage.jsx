import { GoAlertFill } from "react-icons/go";

const ErrorMessage = ({ text }) => {
  return (
    <div className="error">
      <div className="error-message">
        <GoAlertFill className="error-icon" size={40} color="red" />
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
