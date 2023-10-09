import React, { useEffect } from "react";
import { toast } from "react-toastify";
import BlockUi from "./BlockUi";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { signUp } from "../api/auth";
import { useAuth } from "../context/authProvider";
import { checkFormikErrors } from "../helpers/utility";
import { signUpSchema } from "../validation/Schema";
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
  {
    name: "phone",
    type: "text",
    placeholder: "Enter your phone number",
    id: "phone",
    autoComplete: "true",
    label: "Phone",
    required: false,
  },
];
const MutateErrors = {
  409: "User already exists",
};
function Register() {
  const { isAuthenticated } = useAuth();
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        phone: "",
      },
      onSubmit: (values) => mutate(values),
      validationSchema: signUpSchema,
      validateOnBlur: true,
      validateOnChange: true,
      initialErrors: true,
    });

  const { mutate, isLoading } = useMutation({
    mutationFn: (values) => signUp(values),
    onSuccess: () => toast.success("Registered successfully"),
    onError: (data) =>
      toast.error(
        MutateErrors[data?.response?.status] || "something went wrong"
      ),
  });

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="w-[500px] flex flex-col justify-center border-amber-200 border p-3">
      <h1 className="text-center">Register</h1>
      <BlockUi blocked={isLoading}>
        <form onSubmit={handleSubmit}>
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
            className="w-full mt-1 text-white rounded bg-zinc-900 disabled:opacity-5 disabled:cursor-not-allowed"
            disabled={isLoading || checkFormikErrors(errors)}
          >
            Register
          </button>
          <span className="flex justify-center gap-1 mt-2">
            {" "}
            already have an account? <Link to="/login"> Login </Link>{" "}
          </span>
        </form>
      </BlockUi>
    </div>
  );
}

export default Register;
