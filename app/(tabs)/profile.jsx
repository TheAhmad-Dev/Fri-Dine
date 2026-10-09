import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ProfileScreen() {
  const router = useRouter();
 const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ CHECK USER TYPE
  useEffect(() => {
    let unsubscribe;

    const checkUser = async () => {
      const guest = await AsyncStorage.getItem("isGuestUser");

      // ===== GUEST MODE =====
      if (guest === "true") {
        setIsGuest(true);
        setLoading(false);
        return;
      }

      // ===== FIREBASE USER MODE =====
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setIsGuest(true);
          setLoading(false);
          return;
        }

        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (err) {
          console.log("Firestore Error:", err);
        } finally {
          setLoading(false);
        }
      });
    };

    checkUser();
    return () => unsubscribe && unsubscribe();
  }, []);

  // ✅ LOGOUT FUNCTION (ONLY REAL USERS)
  const logoutUser = async () => {
    try {
      await AsyncStorage.clear();
      await signOut(auth);

      setShowLogoutModal(true);

      setTimeout(() => {
        setShowLogoutModal(false);
        router.replace("/signin");
      }, 1500);
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF6E9",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 ,  color :  "#944f21"}}>
        User Profile
      </Text>

      {/* PROFILE CARD */}
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: "#FEA727"
          , paddingBottom: insets.bottom 
        }}
      >
        {isGuest ? (
          <>
            <Text style={{ fontSize: 18, fontWeight: "bold" , 
             }}>
              👤 Guest User
              </Text>
            <Text style={{ marginTop: 8 }}>
              You are using Guest Mode. Please Sign In or Sign Up.
            </Text>
          </>
        ) : (
          <>
            <Text style={{ fontWeight: "bold" }}>👤 Name:</Text>
            <Text>{profile?.name || "No Name Found"}</Text>

            <Text style={{ fontWeight: "bold", marginTop: 10 }}>📧 Email:</Text>
            <Text>{profile?.email || auth.currentUser?.email}</Text>
          </>
        )}
      </View>

      {/* ===== GUEST BUTTONS ===== */}
      {isGuest && (
        <View style={{ width: "100%", marginTop: 25 }}>
          {/* SIGN IN */}
          <TouchableOpacity
            onPress={() => router.push("/signin")}
            style={{
              backgroundColor: "black",
              padding: 12,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#f0a10f",
              marginBottom: 12,
              width : 200 , 
              alignSelf:"center"
            }}
          >
            <Text style={{ color: "#f0a10f", textAlign: "center", fontWeight: "bold" }}>
              Sign In
            </Text>
          </TouchableOpacity>

          {/* SIGN UP */}
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            style={{
              backgroundColor: "#f0a10f",
               borderColor :"black",
               borderWidth: 1 ,
              padding: 12,
              borderRadius: 10,
              marginBottom: 12,
               width : 190 ,  
               marginLeft : 65 ,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold"  , 
             
             }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* ❌ CANCEL BUTTON */}
          <TouchableOpacity
            onPress={() => router.back()} // OR router.replace("/home")
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "red",
                 width : 155 ,  
               marginLeft : 77
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold", color: "red" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== LOGOUT BUTTON (REAL USERS ONLY) ===== */}
      {!isGuest && (
        <TouchableOpacity
          onPress={logoutUser}
          style={{
            backgroundColor: "black",
            padding: 12,
            borderRadius: 10,
            marginTop: 25,
            borderWidth: 2,
            borderColor: "#f0a10f",
            paddingHorizontal:27
          }}
        >
          <Text style={{ color: "#f0a10f", fontWeight: "bold" }}>
            Logout
          </Text>
        </TouchableOpacity>
      )}

      {/* LOGOUT MODAL */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 15 }}>
            <Text>✅ Logged Out Successfully</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}