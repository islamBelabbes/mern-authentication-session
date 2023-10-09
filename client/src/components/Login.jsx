import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import BlockUi from "./BlockUi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { login } from "../api/auth";
import { useAuth } from "../context/authProvider";
import { loginSchema } from "../validation/Schema";
import { checkFormikErrors } from "../helpers/utility";
const inputs = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    id: "email",
    autoComplete: "true",
    label: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    id: "password",
    autoComplete: "false",
    label: "Password",
    required: true,
  },
];

const MutateErrors = {
  404: "User not found",
  401: "Invalid credentials",
};

function Login() {
  const { isAuthenticated, signIn } = useAuth();
  const [isLoggedInSuccess, setIsLoggedInSuccess] = useState(false);
  const navigate = useNavigate();
  let { state } = useLocation();
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        return mutate(values);
      },
      validationSchema: loginSchema,
      validateOnBlur: true,
      validateOnChange: true,
      initialErrors: true,
    });
  const { mutate, isLoading } = useMutation({
    mutationFn: (values) => login(values),
    onSuccess: (data) => {
      setIsLoggedInSuccess(true);
      toast.success("logged in successfully redirecting...", {
        onClose: () => {
          signIn({
            data: data.data.data,
            onSignIn: () => navigate(state?.from || "/"),
          });
        },
        autoClose: 500,
      });
    },
    onError: (data) => {
      toast.error(
        MutateErrors[data?.response?.status] || "something went wrong"
      );
    },
  });
  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="w-[500px] flex flex-col justify-center border-amber-200 border p-3">
      <h1 className="text-center">Login</h1>
      <BlockUi blocked={isLoading}>
        <form onSubmit={handleSubmit} className="relative">
          {inputs.map((input, index) => (
            <div key={index + 1}>
              {input.label && <label htmlFor={input.id}>{input.label}</label>}
              <input
                className={`w-full border border-amber-950 ${
                  errors[input.name] && touched[input.name] && "border-red-500"
                }`}
                type={input.type}
                name={input.name}
                id={input.id}
                autoComplete={input.autoComplete}
                placeholder={input.placeholder}
                required={input.required}
                value={values[input.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                {errors[input.name] &&
                  touched[input.name] &&
                  errors[input.name]}
              </span>
            </div>
          ))}
          <button
            className="w-full mt-1 text-white rounded bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
            disabled={
              isLoading || isLoggedInSuccess || checkFormikErrors(errors)
            }
          >
            Login
          </button>
          <span
            className={`flex justify-center gap-1 mt-2 ${
              isLoading || (isLoggedInSuccess && "cursor-not-allowed")
            }`}
          >
            {" "}
            not a member yet ?{" "}
            <Link
              to="/signup"
              className={`${
                isLoading || (isLoggedInSuccess && "pointer-events-none")
              }`}
            >
              {" "}
              signUp{" "}
            </Link>{" "}
          </span>
        </form>
      </BlockUi>
    </div>
  );
}

export default Login;
