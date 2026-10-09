import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name is too short").required("Name  required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Too short").required("Password required"),
  });
  export default validationSchema ; 