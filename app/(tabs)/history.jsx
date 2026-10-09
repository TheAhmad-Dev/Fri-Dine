import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { auth, db } from "../../config/firebaseconfig";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const History = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserEmail(currentUser?.email || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ✅ Load user profile from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (err) {
        console.log("❌ Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  // ✅ Fetch bookings for the logged-in user
  useEffect(() => {
    if (!user) return;

    // Adjust collection name & field name to match your Firestore exactly
    const bookingsQuery = query(
      collection(db, "Bookings"), // <-- Match your Firestore collection name
      where("userId", "==", user.uid) // <-- Match the exact field in your documents
    );

    const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("🔥 USER BOOKINGS RAW DATA:", data); // Debug log
      setBookings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // ✅ Render single booking item
  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#FEA727",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "black" }}>
        🍽 Restaurant: {item.restaurant}
      </Text>

      <Text style={{ color: "black" }}>⏰ Slot: {item.slot}</Text>
      <Text style={{ color: "black" }}>👤 Guests: {item.guests}</Text>

      {item.date && (
        <Text style={{ color: "black" }}>
          📅 Date: {new Date(item.date.seconds * 1000).toLocaleString()}
        </Text>
      )}

      {item.name && <Text style={{ color: "black" }}>🧑 Name: {item.name}</Text>}
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF6E9",
        paddingBottom: insets.bottom,
      }}
    >
      <View style={{ padding: 12, flex: 1 }}>
        {/* PROFILE */}
        {profile && (
          <View
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 16,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#FEA727",
            }}
          >
            <Image
              source={{ uri: profile.photoURL || "https://i.pravatar.cc/150" }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: "#FEA727",
              }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
                {profile.name || "User"}
              </Text>
              <Text style={{ color: "gray" }}>{userEmail}</Text>
            </View>
          </View>
        )}

        <Text style={{ fontSize: 22, fontWeight: "bold", color: "black" }}>
          Booking History
        </Text>

        {/* Guest UI */}
        {!user && !loading && (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 16 }}>
              Sign in to view your booking history
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/signin")}
              style={{
                marginTop: 12,
                backgroundColor: "#FEA727",
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading */}
        {loading && (
          <ActivityIndicator size="large" color="#FEA727" style={{ marginTop: 30 }} />
        )}

        {/* History List */}
        {!loading && user && (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={{ marginTop: 20, color: "black" }}>
                No bookings found...
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default History;