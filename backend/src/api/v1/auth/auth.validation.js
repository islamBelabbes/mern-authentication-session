const yup = require("yup");
const loginSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("email is required"),
  password: yup.string().required("password is required"),
});
const signUpSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("email is required"),
  password: yup.string().required("password is required"),
  phone: yup
    .number()
    .integer("Only intergers are accepted.")
    .typeError("Only intergers are accepted.")
    .min(0, "Min value is 0.")
    .max(100, "Max value is 100.")
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    ),
});

module.exports = {
  loginSchema,
  signUpSchema,
};
