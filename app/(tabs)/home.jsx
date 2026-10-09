import {
  View,
  Text,
  Platform,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import homelogo from "../../assets/images/homelogo.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import uploaddata from "../../config/bulkupload.js";
import { fetchAllRestaurants } from "../../config/restaurantService.js";
import uploadCarousel from "../../config/carouselUpload.js";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import homeBanner from "../../assets/images/homeBanner.png";
import uploadSlots from "../../config/uploadSlots.js";
import { collection, getDocs, query } from "firebase/firestore";
import { restaurants } from "../../store/restaurants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWindowDimensions } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
const Home = () => {

  const [loading, setLoading] = useState(true);
  const [restaurantList, setRestaurantList] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const hasUploaded = useRef(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  //  const windowheight = Dimensions.get("window").height;
const temp = async()=>{
  const email  = await AsyncStorage.getItem("userEmail")
  const value = await AsyncStorage.getItem("is GuestUser");
console.log(value, email ) ;
}
  useEffect(() => {
    initializeData();
    temp();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);

      // Upload data only once if not already uploaded
      if (!hasUploaded.current) {
        hasUploaded.current = true;
        console.log("🔄 Checking/uploading restaurant data...");

        // const result = await uploaddata();
        // setUploadStatus(result.message);
        await uploaddata(); // upload restaurants
        await uploadCarousel(); // upload carousel
        await uploadSlots();
      }

      // Fetch restaurants from Firebase
      console.log("🔄 Fetching restaurants from Firebase...");
      const restaurants = await fetchAllRestaurants();

      if (restaurants.length > 0) {
        setRestaurantList(restaurants);
        console.log(`✅ Loaded ${restaurants.length} restaurants`);
      } else {
        console.log("⚠️ No restaurants found, using fallback");
        // Fallback to local data if Firebase is empty
        const localRestaurants = require("../../store/restaurants.js").default;
        setRestaurantList(localRestaurants);
      }
    } catch (error) {
      console.error("❌ Error initializing data:", error);
      // Fallback to local data on error
      const localRestaurants = require("../../store/restaurants.js").default;
      setRestaurantList(localRestaurants);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      style={{
        padding: 8,
        marginRight: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        style={{ height: 150, width: 210, borderRadius: 12, marginTop: 8 }}
      />
      <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
        <Text style={{ color: "#2B2B2B", fontWeight: "bold", fontSize: 15 }}>
          {item.name}
        </Text>
        <Text style={{ color: "#666", fontSize: 13 }} numberOfLines={1}>
          {item.address}
        </Text>
        <Text style={{ color: "#666", fontSize: 12 }}>
          Open: {item.opening} - {item.closing}
        </Text>
        {item.seats && (
          <Text style={{ color: "#F4A300", fontSize: 12, fontWeight: "600" }}>
            Seats: {item.seats}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
  const getRestaurants = async () => {
    const q = query(collection(db, restaurants));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurantList((prev) => [...prev, item.data()]);
    });

    useEffect(() => {
      getRestaurants();
    }, []);
  };

  return (
     
   <SafeAreaView style={{ backgroundColor: "#F8F3ED", paddingBottom: insets.bottom }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F4A300",
            paddingVertical: 5,
            paddingHorizontal: 45,
            borderRadius: 14,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 12,
              },
              android: {
                elevation: 5,
              },
            }),
          }}
        >
          <StatusBar style="dark" />
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#2C2C2C" }}>
            Welcome to
          </Text>
          <Image
            resizeMode={"contain"}
            style={{ width: 120, height: 30, marginLeft: -3 }}
            source={homelogo}
          />
        </View>
      </View>

      <ImageBackground
        source={homeBanner}
        resizeMode={"cover"}
        style={{
          minHeightHeight: 115,
          marginHorizontal: 2,
          backgroundColor: "#F8F3ED",
          overflow: "hidden",
          justifyContent: "flex-end",
        }}
      >
        <BlurView
          intensity={40}
          tint="light"
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            paddingHorizontal: 12,
            paddingTop: 55,
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#2B2B2B",
              textAlign: "center",
            }}
          >
            Dine with your loved ones
          </Text>
        </BlurView>
      </ImageBackground>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text
          style={{
            color: "#F4A300",
            fontWeight: "bold",
            fontSize: 22,
            marginLeft: 22,
            paddingBottom: 8,
            paddingTop: 15,
          }}
        >
          Our Restaurants
        </Text>

        {loading ? (
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#F4A300" />
            <Text style={{ marginTop: 10, color: "#666" }}>
              Loading restaurants...
            </Text>
          </View>
        ) : restaurantList.length === 0 ? (
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#666", fontSize: 16 }}>
              No restaurants found
            </Text>
          </View>
        ) : (
          <FlatList
            data={restaurantList}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || `restaurant-${index}`}
            horizontal
            contentContainerStyle={{ paddingLeft: 22 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        )}

        <Text
          style={{
            color: "#41351e",
            fontWeight: "bold",
            fontSize: 22,
            marginLeft: 22,
            paddingBottom: 8,
            paddingTop: 15,
          }}
        >
          Special Discounts
        </Text>

        {loading ? (
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#F4A300" />
          </View>
        ) : (
          <FlatList
            data={restaurantList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `discount-${item.id || index}`}
            horizontal
            contentContainerStyle={{ paddingLeft: 22 }}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
   
  );
  
};


export default Home;
