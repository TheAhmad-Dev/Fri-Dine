import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Animated,
  Linking,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseconfig.js";
import { doc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { restaurant } from "../../store/restaurants";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuestPickerComponent from "../../component/restaurant/GuestPickerComponent.jsx";
import FindSlots from "../../component/restaurant/FindSlots.jsx";

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const [restaurantData, setRestaurant] = useState({});
  const [carouselData, setCarouselData] = useState([]);
  const [slotsData, setSlotsData] = useState([]);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [date, setDate] = useState(new Date());
const [showPicker, setShowPicker] = useState(false);
const [selectedNumber  ,  setselectedNumber ] = useState(2)  ; 
const [selectedSlots  , setSelectedSlots]  =  useState();



  const handleNextIndex = () => {
    const carousellength = carouselData[0]?.images.length;

    if (currentIndex < carousellength - 1) {
      const nextIndex = currentIndex + 1;
      setcurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex == carousellength - 1) {
      const nextIndex = 0;
      setcurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlebackIndex = () => {
    const carousellength = carouselData[0]?.images.length;

    if (currentIndex > 0) {
      const backIndex = currentIndex - 1;
      setcurrentIndex(backIndex);
      flatListRef.current.scrollToIndex({ index: backIndex, animated: true });
    }
    if (currentIndex == 0) {
      const backIndex = carousellength - 1;
      setcurrentIndex(backIndex);
      flatListRef.current.scrollToIndex({ index: backIndex, animated: true });
    }
  };

  const carouselItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth, alignItems: "center"  }}>
        <Image
          source={{ uri: item }}
          style={{
            width: windowWidth - 30,
            height: 180,
            borderRadius: 20,
          }}
          resizeMode="cover"
        />

        <View
          style={{
            position: "absolute",
            right: 25,
            top: 70,
            backgroundColor: "rgba(0,0,0,0.45)",
            padding: 6,
            borderRadius: 50,
          }}
        >
          <Ionicons
            onPress={handleNextIndex}
            name="arrow-forward-circle-outline"
            size={28}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            left: 25,
            top: 70,
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: 6,
            borderRadius: 50,
          }}
        >
          <Ionicons
            onPress={handlebackIndex}
            name="arrow-back-circle-outline"
            size={28}
            color="white"
          />
        </View>
      </View>
    );
  };

  const getRestaurantsData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant),
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log(" ❌ No matching data found");
        return;
      }
      for (const docSnap of restaurantSnapshot.docs) {
        const resData = docSnap.data();
        setRestaurant(resData);

        // Restaurant reference
        const restaurantRef = doc(db, "restaurants", docSnap.id);
        console.log("   ✅ Restaurant Ref Loaded:", restaurantRef.path);

        // 🔹 CAROUSEL QUERY
        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", restaurantRef),
        );

        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages = [];

        if (carouselSnapshot.empty) {
          console.log("❌ No matching carousel found");
        } else {
          carouselSnapshot.forEach((carouselDoc) => {
            carouselImages.push(carouselDoc.data());
          });

          setCarouselData(carouselImages);
          console.log("✅ Carousel Loaded:", carouselImages);
        }

        // const restaurantRef = doc(db, "restaurants", docSnap.id);
        const slotsQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", restaurantRef),
        );

        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];

        if (slotsSnapshot.empty) {
          console.log("❌ No slots data found");
        } else {
          slotsSnapshot.forEach((slotDoc) => {
            slots.push(slotDoc.data());
          });

          setSlotsData(slots);
          console.log("✅ Slots Loaded:", slots);
        }
      }
    } catch (error) {
      console.log("Error in fetching  Data ", error);
    }
  };
  const handleLocation = async () => {
    const address = restaurantData?.address;
    if (!address) {
      console.log("❌ No address found");
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    await Linking.openURL(url);
  };
  const onChangeDate = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShowPicker(false);
  setDate(currentDate);
};


  useEffect(() => {
    getRestaurantsData();

    console.log("OPENING:", restaurantData?.opening);
    console.log("CLOSING:", restaurantData?.closing);
  }, []);

  console.log(restaurantData);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        style={{
         
          justifyContent: "center",
          padding: 5,
          marginRight: 0,
          borderRadius: 12, 
          backgroundColor: "#F5EFE6",
          // iOS shadow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          // Android shadow
          elevation: 3,
        }}
      >
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 22,
                letterSpacing: 0.5   ,
                fontWeight: "bold",
                color: "#5A3E2B",
                alignContent: "center",
                justifyContent: "center",
                marginLeft: 95,
                marginBottom: -12,
                marginTop: -5,
              }}
            >
              {restaurant}
            </Text>
            <View
              style={{
                width: 345,
                height: 2,
                backgroundColor: "#fEA727",
                marginVertical: 20,
                marginLeft: 2,
                marginBottom: 2,
              }}
            />
          </View>
          
    
     
        {/* <ScrollView> */}
        <View
          style={{ width: "100%", height: 210, paddingTop: -5, marginTop: 7 }}
        >
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            style={{ marginTop: 1 }}
          />
          <View
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              bottom: 30,
              flexDirection: "row",
              alignSelf: "center",
              transform: [{ translateX: -10 }],
              zIndex: 10 ,
              padding :10 ,
            marginleft : 8
              
            
            }}
          >
            {carouselData[0]?.images?.map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === currentIndex ? 25 : 8,
                  // width: index === currentIndex ? 8 : 55,
                  height: index === currentIndex ? 8 : 6,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  backgroundColor:
                    index === currentIndex
                      ? "white"
                      : "rgba(255, 255, 255, 0.66)",
                }}
              />
            ))}
            <View
              style={{
                backgroundColor: "white",
                height: 6,
                width: 6,
                borderRadius: 3,

                marginHorizontal: 4,
              }}
            />
          </View>
        </View>
        {/* 
        </ScrollView> */}
        <View
          style={{
            padding: 15,
            marginTop: 2,
            flexDirection: "row",
            marginRight: 6,
            alignItems: "center",
          }}
        >
          <Ionicons
            // onPress={handleLocation}
            name="location-sharp"
            size={23}
            color="#fEA727"
          />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              fontSize: 14,
              fontWeight: "bold",
              color: "black",
              marginRight: 8,
            }}
          >
            {restaurantData?.address}
          </Text>

          <Text
            onPress={handleLocation}
            style={{
            backgroundColor: "#f0a10f",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,      fontSize: 13,
      fontWeight: "600",
            }}
          >
            Get Direction
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 19,
            marginTop: 10,
          }}
        >
          <Ionicons name="time-sharp" size={23} color="#fEA727" />
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
              marginRight: 8,
              letterSpacing:1.2
            }}
          >
            {restaurantData?.opening} -{restaurantData?.closing}
          </Text>
        </View>

        <View     style ={{   justifyContent:"center"  ,
         padding: 7 ,
  borderRadius: 22,
  borderWidth: 2,
  borderColor: "#fEA727"  ,
 paddingLeft : 1 ,
  margin : 15 
  }}>
      <View style={{ 
        marginTop: 20, paddingLeft: 19, flexDirection:"row"  ,  flexDirection:"row" ,  alignContent :"center", 
      
      }}>

 <Ionicons  name="calendar"  size={22} style={{color:'#fEA727' ,paddingLeft: -5 }} />
  <Text onPress={() => setShowPicker(true)} 
   activeOpacity={0.85}
  style={{   
  backgroundColor:"#f0a10f",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10  , 
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#FEA727",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
     fontSize: 13,
              fontWeight: "bold",  
              marginRight :  29 , 
             
     }}>
    
    Select Booking : 
  </Text>
 

  {showPicker && (
    <DateTimePicker
      value={date} 
      mode="date"
      display="default"
      onChange={onChangeDate}

      //  this is the Setting of the time interval 
       minimumDate={new Date()}
  maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
    />
  )}

  <Text style={{ fontSize: 14, marginTop: 5 , fontWeight:"bold" }}>
    {date.toDateString()}  
  </Text>
</View>
<View  style ={{
  justifyContent:"center"   , 
  alignContent:"center"   , 
  flexDirection: "row"   , 
  padding: 20  ,
  paddingLeft : 3  ,
  paddingTop :"25"
  }}>

  <Ionicons     name="people"  size={28}   color= "#fEA727"  style= {{paddingLeft : 16  }}    />

  <Text style={{ fontSize: 14, marginTop: 5 , fontWeight:"bold"  ,paddingLeft: 8  , paddingRight: 10  }}>
    Select number of guests : 
 </Text>
<GuestPickerComponent     selectedNumber={selectedNumber}  setselectedNumber={setselectedNumber}    />
 

 </View>
</View>
<View  style = {{ flex: 1 , marginTop: -12 , marginBottom: 1  }}>
  <FindSlots 
  date={date}
  selectedNumber = {selectedNumber}   
  slots={slotsData}
    selectedSlots = {selectedSlots}
    setSelectedSlots = {setSelectedSlots}
    restaurant ={restaurant}
    />
</View>
    </ScrollView>
      </SafeAreaView>
    </ >
  );
}
