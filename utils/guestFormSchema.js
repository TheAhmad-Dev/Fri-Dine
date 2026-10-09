import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-10]+$/, "Phone number must be digits")
    .min(11, "Phone number must be at least 11 digits"),
});

export default validationSchema;