import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
// import validationSchema from "../../utils/signinSchema";
import signinpizza from "../../assets/images/signinpizza.png";
import React, { useRef } from "react";
import signinroll from "../../assets/images/signinroll.png";
import { Modal } from "react-native";
import { BlurView } from "expo-blur";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig"; // adjust path
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
const Signin = () => {
  const signinSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showErrorPopup, setShowErrorPopup] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSignin = async (values) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const user = userCredentials.user;
      router.push("/home");
      const userdoc = await getDoc(doc(db, "users", user.uid));

      if (userdoc.exists()) {
        console.log("User Data ", userdoc.data());
        await AsyncStorage.setItem("userEmail", values.email);
         await AsyncStorage.setItem("is Guest", "false");
      } else {
        console.log("No such user found ");
      }

      const saved = await AsyncStorage.getItem("userEmail");
      console.log("Saved Email:", saved);
    } catch (error) {
      console.log("LOGIN ERROR:", error.code);

      let message = "Login failed. Please check your details.";

      switch (error.code) {
        case "auth/invalid-email":
          message = "Email format is invalid";
          break;

        case "auth/wrong-password":
          message = "Password is incorrect";
          break;

        case "auth/user-not-found":
          message = "No account found with this email";
          break;

        case "auth/too-many-requests":
          message = "Too many attempts. Try later";
          break;

        case "auth/missing-email":
          message = "Please enter email";
          break;

        case "auth/missing-password":
          message = "Please enter password";
          break;

        case "auth/network-request-failed":
          message = "No internet connection";
          break;
      }

      setErrorMsg(message);
      setShowErrorPopup(true);
    }
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF6E9" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
            paddingTop: 120,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              marginTop: -20,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          >
            <Image
              source={signinroll}
              style={{
                width: "100%",
                height: 135,
                marginTop: -100,
                marginBottom: -30,
              }}
            />
            <Text
              style={{
                color: "#b5A2E1F",
                textAlign: "center",
                fontWeight: 600,
                letterSpacing: 0.3,
                marginTop: 28,
                marginBottom: 5,
                fontSize: 20,
                color: "#5A2E1F",
                fontFamily: "serif",
                paddingBottom: 8,
                paddingTop: 1,
              }}
            >
              Welcome Back
            </Text>
          </View>
          <View style={{ width: "100%", paddingHorizontal: 22 }}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={signinSchema}
              onSubmit={handleSignin}
            >
              {({
                handleBlur,
                handleChange,
                errors,
                values,
                handleSubmit,
                touched,
              }) => (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      color: "#d37f00",
                      fontweight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Email
                  </Text>
                  <TextInput
                    style={{
                      height: 35,
                      borderWidth: 2,
                      borderColor: "#C8A46A",
                      marginBottom: 1,
                      paddingHorizontal: 10,
                      marginBottom: 10,
                      color: "black",
                      textAlign: "left",
                      textSize: 16,
                      textAlignVertical: "center",
                      paddingHorizental: 10,
                      paddingVertical: 0,
                      fontSize: 16,
                      borderRadius: 7,
                    }}
                    placeholder="Enter Email"
                    ref={emailRef}
                    returnkeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text style={{ color: "red", fontSize: 14 }}>
                      {errors.email}
                    </Text>
                  )}

                  <Text
                    style={{
                      color: "#d37f00",
                      fontweight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Password
                  </Text>
                  <View
                    style={{ position: "relative", justifyContent: "center" }}
                  >
                    <TextInput
                      style={{
                        height: 40,
                        borderWidth: 2,
                        borderColor: "#C8A46A",
                        paddingHorizontal: 10,
                        paddingRight: 40, // space for icon
                        color: "black",
                        borderRadius: 7,
                      }}
                      secureTextEntry={!showPassword}
                      placeholder="Enter password"
                      ref={passwordRef}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      onBlur={handleBlur("password")}
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 7, // adjust if needed
                      }}
                    >
                      <Ionicons
                        name={showPassword ? "eye" : "eye-off"}
                        size={22}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <Text style={{ color: "red", fontSize: 14 }}>
                      {errors.password}
                    </Text>
                  )}
                  <View
                    style={{
                      marginTop: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={handleSubmit}>
                      <View
                        style={{
                          width: 240,
                          height: 32,
                          marginVertical: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#FEA727",
                          borderRadius: 7,
                          marginVertical: 30,
                          marginTop: 3,
                          marginBottom: 1,
                          borderColor: "black",
                          borderWidth: 0.5,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 19,
                            textAlign: "center",
                            borderRadius: 30,
                          }}
                        >
                          Sign in
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <Modal transparent visible={showErrorPopup} animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              >
                <BlurView
                  intensity={80}
                  tint="light"
                  style={{
                    width: "80%",
                    padding: 20,
                    borderRadius: 45,
                    borderColor: "rgba(223, 206, 206, 0.86)",
                    borderWidth: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Signin Failed ❌
                  </Text>

                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {errorMsg}
                  </Text>

                  <TouchableOpacity
                    onPress={() => setShowErrorPopup(false)}
                    style={{
                      marginTop: 15,
                      backgroundColor: "rgba(254,167,39,0.8)",
                      paddingHorizontal: 30,
                      paddingVertical: 8,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>OK</Text>
                  </TouchableOpacity>
                </BlurView>
              </View>
            </Modal>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 20,
              }}
            >
              <View
                style={{ width: 100, height: 2, backgroundColor: "#fEA727" }}
              />
              <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>
                Or
              </Text>
              <View
                style={{ width: 100, height: 2, backgroundColor: "#fEA727" }}
              />
            </View>

            <View
              style={{
                marginTop: -3,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#2B1E1E",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                  marginTop: -10,
                  marginBottom: 0,
                }}
              >
                Register now ?{" "}
                <Text
                  style={{
                    color: "#F4A300",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                    fontSize: 16,
                  }}
                  onPress={() => router.push("/signup")}
                >
                  Sign up
                </Text>
              </Text>
              <Image
                source={signinpizza}
                style={{ width: "100%", height: 260 }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;
