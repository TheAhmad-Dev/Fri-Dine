import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
});

const FindSlots = ({
  slots,
  selectedSlots,
  setSelectedSlots,
  selectedNumber,
  setSelectedNumber,
  date,
  restaurant,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const formattedSlots = slots?.[0]?.slot || [];

  // --- SLOT SELECTION ---
  const handleSlotPress = (slot) => {
    setSelectedSlots(selectedSlots === slot ? null : slot);
  };

  // --- BOOKING CLICK ---
  const handleBookingPress = async () => {
    const currentDate = new Date().toISOString();

    const email = await AsyncStorage.getItem("userEmail");
    const isGuest = await AsyncStorage.getItem("isGuestUser");

    // If no logged-in user OR guest → open guest form
    if (!email || isGuest === "true") {
      setModalVisible(true);
      return;
    }

    try {
      await addDoc(collection(db, "Bookings"), {
        email,
        slot: selectedSlots,
        guests: selectedNumber,
        date: currentDate,
        restaurant,
      });
      setShowSuccess(true);
    } catch (error) {
      console.log("Booking Error:", error);
    }
  };

  // --- GUEST FORM SUBMIT ---
  const handleFormSubmit = async (values) => {
    try {
      const currentDate = new Date().toISOString();
      const guestEmail = "guest@" + values.phoneNumber;

      // Save guest user
      await addDoc(collection(db, "GuestUsers"), {
        name: values.fullName,
        phone: values.phoneNumber,
        createdAt: currentDate,
      });

      // Save booking
      await addDoc(collection(db, "Bookings"), {
        email: guestEmail,
        name: values.fullName,
        phone: values.phoneNumber,
        slot: selectedSlots,
        guests: selectedNumber,
        date: currentDate,
        restaurant,
      });

      // Store guest session
      await AsyncStorage.setItem("userEmail", guestEmail);
      await AsyncStorage.setItem("isGuestUser", "true");

      setModalVisible(false);
      setShowSuccess(true);
    } catch (error) {
      console.log("Guest Save Error:", error);
    }
  };

  // --- Clear leftover emails on first load for guest mode ---
  useEffect(() => {
    const clearOldGuestData = async () => {
      const isGuest = await AsyncStorage.getItem("isGuestUser");
      if (isGuest === "true") {
        // clear previous email just in case
        await AsyncStorage.removeItem("userEmail");
      }
    };
    clearOldGuestData();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      {/* --- Buttons --- */}
      <View style={{ flexDirection: slotsVisible ? "row" : "column", gap: 12 }}>
        <TouchableOpacity onPress={() => setSlotsVisible(!slotsVisible)}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              backgroundColor: "#FEA727",
              borderRadius: 12,
              paddingHorizontal: 37,
              paddingVertical: 8,
              textAlign: "center",
              marginLeft: 22,
              elevation: 4,
            }}
          >
            Find Slots
          </Text>
        </TouchableOpacity>

        {selectedSlots && (
          <TouchableOpacity onPress={handleBookingPress}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "#f0a10f",
                borderRadius: 12,
                paddingHorizontal: 37,
                paddingVertical: 8,
                textAlign: "center",
                marginLeft: 22,
                elevation: 4,
              }}
            >
              Book Slot
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* --- Slot List --- */}
      {slotsVisible && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {formattedSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSlotPress(time)}
              style={{
                backgroundColor: "#f0a10f",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 10,
                margin: 9,
                elevation: 9,
                borderWidth: selectedSlots === time ? 2 : 0,
                borderColor: "black",
                opacity: selectedSlots && selectedSlots !== time ? 0.4 : 1,
              }}
            >
              <Text style={{ color: "black", fontWeight: "bold" }}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* --- SUCCESS MODAL --- */}
      <Modal transparent visible={showSuccess} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <BlurView
            intensity={80}
            tint="light"
            style={{
              width: "80%",
              padding: 20,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
              alignItems: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={60} color="green" />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
              Booking Successful!
            </Text>

            <TouchableOpacity
              onPress={() => setShowSuccess(false)}
              style={{
                marginTop: 15,
                backgroundColor: "#FEA727",
                padding: 10,
                borderRadius: 12,
              }}
            >
              <Text style={{ fontWeight: "bold", marginHorizontal: 30 }}>OK</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>

      {/* --- GUEST FORM MODAL --- */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "#00000080", justifyContent: "flex-end" }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)} />
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Formik
              initialValues={{ fullName: "", phoneNumber: "" }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <Text>Name</Text>
                  <TextInput
                    style={{ borderWidth: 2, padding: 10, borderRadius: 8, borderColor: "#C8A46A" }}
                    placeholder="Enter Name"
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                  />
                  {touched.fullName && <Text style={{ color: "red" }}>{errors.fullName}</Text>}

                  <Text style={{ marginTop: 10 }}>Phone</Text>
                  <TextInput
                    style={{ borderWidth: 2, padding: 10, borderRadius: 8, borderColor: "#C8A46A" }}
                    placeholder="Enter Phone"
                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                  />
                  {touched.phoneNumber && <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#FEA727",
                      padding: 8,
                      borderRadius: 8,
                      marginTop: 15,
                      borderColor: "black",
                      borderWidth: 1,
                      alignItems: "center",
                      width: 240,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: "#FEA727",
                      borderWidth: 1,
                      borderColor: "black",
                      padding: 8,
                      borderRadius: 8,
                      width: 200,
                      marginTop: 10,
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;