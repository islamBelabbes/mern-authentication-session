import { object, string, number } from "yup";

export const loginSchema = object({
  email: string()
    .email("please enter a valid email")
    .required("email is required"),
  password: string().required("password is required"),
});
export const signUpSchema = object({
  email: string()
    .email("please enter a valid email")
    .required("email is required"),
  password: string().required("password is required"),
  phone: number("please enter a valid phone number").typeError(
    "please enter a valid phone only numbers are accepted"
  ),
});
