import { Stack } from "expo-router";

export default function RootLayout() {
  return ( 
    <Stack    screenOptions={{headerStyle :{backgroundColor :"#E39A1C"}  ,
      headerTintColor : "#5A2E1F",
      headerTitleAlign : "center" }} >
    <Stack.Screen name="index"  options={{  title:"Home"  ,  headerShown: false
    }} />
    <Stack.Screen  name="signin"  options={{title : "Sign In "  , headerShown: false }}/>
    {/* <Stack.Screen name ="signup"  options={{title : "Sign Up " , headerShown: false }}/> */}
    <Stack.Screen name= "(tabs)" options={{headerShown : false}}/> 
    {/* <Stack.Screen name= "/restaurant/${item.name}" options={{ headerShown:false}}   /> */}
     </Stack>
  );
}