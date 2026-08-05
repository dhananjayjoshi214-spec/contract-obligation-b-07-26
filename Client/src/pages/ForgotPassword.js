import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaShieldAlt } from "react-icons/fa";

import AuthLayout from "../layouts/AuthLayout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setMessage(
      "Password reset link has been sent to your email."
    );
  };

  return (
    <AuthLayout>

      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "450px",
          borderRadius: "20px",
        }}
      >

        <div className="text-center">

          <FaShieldAlt
            size={55}
            className="text-primary mb-3"
          />

          <h2 className="fw-bold">
            Forgot Password
          </h2>

          <p className="text-secondary">
            Enter your registered email address
            and we'll send you a password reset link.
          </p>

        </div>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label className="form-label fw-semibold">
            Email Address
          </label>

          <div className="input-group mb-4">

            <span className="input-group-text">
              <FaEnvelope />
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Send Reset Link
          </button>

        </form>

        <div className="text-center mt-4">

          <Link to="/">
            Back to Sign In
          </Link>

        </div>

      </div>

    </AuthLayout>
  );
}

export default ForgotPassword;