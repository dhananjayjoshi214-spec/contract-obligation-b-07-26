import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import AuthLayout from "../layouts/AuthLayout";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import PasswordInput from "../components/PasswordInput";
import FormCheckbox from "../components/FormCheckbox";

import { registerUser } from "../services/authService";

import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();

  const [organization, setOrganization] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [department, setDepartment] = useState("Legal");
  const [role, setRole] = useState("Legal Manager");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [agree, setAgree] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !organization ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept Terms & Conditions.");
      return;
    }

    try {
      await registerUser({
        full_name: firstName + " " + lastName,
        email,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Registration Failed"
      );
    }
  };

  return (
    <AuthLayout>

      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "700px",
          borderRadius: "20px",
        }}
      >

        <div className="text-center">

          <img
            src={logo}
            width="45"
            alt="logo"
            className="mb-3"
          />

          <h2 className="fw-bold">
            Create your account
          </h2>

          <p className="text-secondary">
            Join ContractIQ and manage
            contracts securely.
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <FormInput
            label="Organization Name"
            type="text"
            placeholder="Enter organization"
            value={organization}
            onChange={(e) =>
              setOrganization(e.target.value)
            }
            icon={<FaBuilding />}
          />

          <div className="row">

            <div className="col-md-6">

              <FormInput
                label="First Name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                icon={<FaUser />}
              />

            </div>

            <div className="col-md-6">

              <FormInput
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                icon={<FaUser />}
              />

            </div>

          </div>

          <FormInput
            label="Company Email"
            type="email"
            placeholder="Enter company email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            icon={<FaEnvelope />}
          />

          <FormInput
            label="Phone Number"
            type="text"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            icon={<FaPhone />}
          />
                    <div className="row">

            <div className="col-md-6">

              <FormSelect
                label="Department"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                options={[
                  "Legal",
                  "Finance",
                  "HR",
                  "Operations",
                  "Sales",
                ]}
              />

            </div>

            <div className="col-md-6">

              <FormSelect
                label="Role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                options={[
                  "Legal Manager",
                  "Administrator",
                  "Compliance Officer",
                  "Department Head",
                  "Employee",
                ]}
              />

            </div>

          </div>

          <PasswordInput
            label="Password"
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <div className="mt-3 mb-4">

            <FormCheckbox
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              label="I agree to the Terms & Conditions and Privacy Policy."
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            Create Account
          </button>

        </form>

        <div className="text-center mt-4">

          Already have an account?

          <Link
            to="/"
            className="ms-2"
          >
            Sign In
          </Link>

        </div>

      </div>

    </AuthLayout>
  );
}

export default Register;