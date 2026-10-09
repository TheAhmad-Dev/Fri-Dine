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
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import validationSchema from "../../utils/signupSchema";
import signupdeal from "../../assets/images/signupdeal.png";
import React, { useRef, useState } from "react";
import { auth, db } from "../../config/firebaseconfig";
import { date } from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Modal } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const Signup = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorPopup, setShowErrorPopup] = React.useState(false);
  // const auth = getAuth();
  // const db = getFirestore();

  const handleSignup = async (values) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        CreatedAt: new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
         await AsyncStorage.setItem("is Guest", "false");
      const saved = await AsyncStorage.getItem("userEmail");
      console.log("Saved Email:", saved);

      router.push("/home");
    } catch (error) {
      console.log("ERROR CODE:", error.code);

      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("This email is already registered!");
      } else {
        setErrorMsg(error.message);
      }

      setShowErrorPopup(true); // SHOW POPUP
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
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
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
            <Image source={signupdeal} style={{ width: "100%", height: 260 }} />
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 3,
                marginBottom: 5,
                fontSize: 15,
                color: "#5A2E1F",
                fontFamily: "serif",
                paddingBottom: 12,
                padidngTop: 1,
              }}
            >
              Join Fri Dine
            </Text>
          </View>
          <View style={{ width: "100%", paddingHorizontal: 22 }}>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
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
                    Name
                  </Text>
                  <TextInput
                    style={{
                      height: 30,
                      borderWidth: 2,
                      borderColor: "#C8A46A",
                      marginBottom: 1,
                      paddingHorizontal: 10,
                      color: "black",
                      textAlign: "left",
                      fontSize: 16,
                      textAlignVertical: "center",
                      borderRadius: 7,
                      lineHeight: 18,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      color: "black",
                    }}
                    placeholder="Enter Name"
                    onChangeText={handleChange("name")}
                    value={values.name}
                    onBlur={handleBlur("name")}
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current.focus()}
                  />
                  {touched.name && errors.name && (
                    <Text style={{ color: "red", fontSize: 14 }}>
                      {errors.name}
                    </Text>
                  )}

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
                        height: 39,
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
                          marginBottom: 2,
                          borderColor: "black",
                          borderWidth: 0.57,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 18,
                            textAlign: "center",
                            borderRadius: 30,
                          }}
                        >
                          Register
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Modal
                    transparent
                    visible={showErrorPopup}
                    animationType="fade"
                  >
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
                          Signup Failed ❌
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
              )}
            </Formik>
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
                }}
              >
                Already a User ?{" "}
                <Text
                  style={{
                    color: "#F4A300",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                    fontSize: 19,
                  }}
                  onPress={() => router.push("/signin")}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  
  );
};

export default Signup;
