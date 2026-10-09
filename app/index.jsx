import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import homepict from "../assets/images/homepict.png";
import frontpizza from "../assets/images/frontpizza.png";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
  const router = useRouter();

const handleGuest=async() =>{
  await AsyncStorage.setItem("GuestUser"  , "true")
  router.push("/home");
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF6E9" }}>

      <ScrollView contentContainerStyle={{ height: "100%" }} >

        <View style={{ margin: -30, justifyContent: "center", alignItems: "center" }} >
          <Image source={homepict} style={{ width: 335, height: 300 }} />

          <TouchableOpacity onPress={() => router.push("/signup")}>

            <View style={{ width: 240, height: 32, marginVertical: -7
              , borderColor:"black" , borderWidth:0.5, backgroundColor: "#FEA727", borderRadius: 7 }}>

              <Text style={{ color: "black" ,fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGuest}>
            <View style={{ width: 240, height: 32,borderColor: "#FEA727" , borderWidth: 1.9, marginVertical: 32, backgroundColor: "black", borderRadius: 7 }}>
              <Text style={{ color: "#fEA727", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
                Guest User
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", marginVertical: 23, fontSize: 15 }}>


            <View style={{ width: 100, height: 2, backgroundColor: "#fEA727", marginVertical: 20 }} />
            Or {""}
            <View style={{ width: 100, height: 2, backgroundColor: "#fEA727", marginVertical: 20 }} />
          </Text>
        </View>
        <View style={{ marginTop: -3, justifyContent: "center" }}>

          <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 15 }}>
            
            Already a User ?{" "}

            <Text style={{ color: "#fEA727", fontWeight: "bold", textDecorationLine: "underline", fontSize: 19 }}

              onPress={() => router.push("/signin")}
            >
              Sign in
            </Text>
          </Text>
          <View style={{ margin: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={frontpizza} style={{ width: 335, height: 300 }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
