import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="form-label">
        {label}
      </label>

      <div className="input-group mb-3">

        <span className="input-group-text">
          <FaLock />
        </span>

        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>

      </div>
    </>
  );
}

export default PasswordInput;