 import { View, Text } from 'react-native'
 import React from 'react'
 import { Tabs } from 'expo-router'
 import { Colors } from "../../assets/images/Colors";
 import Ionicons from '@expo/vector-icons/Ionicons';
 import { useSafeAreaInsets } from "react-native-safe-area-context";
                            

 const TabLayout = () => {
    const insets = useSafeAreaInsets();
   return (
     <Tabs
     screenOptions={{
         headerShown : false , 
         tabBarActiveTintColor: Colors.dark.tint,
 tabBarInactiveTintColor: Colors.dark.tabIconDefault,
 tabBarStyle : {
  backgroundColor: Colors.SECONDARY,
           height: 60 + insets.bottom,    //🔥 AUTO height
           paddingBottom: insets.bottom,  //🔥 AUTO padding
           paddingTop: 6,
           borderTopWidth: 0,
           elevation: 10,
  
  },
  tabBarLabelStyle:{
    fontSize: 12 ,  
    fontWeight :"bold"},
      }}   
      >
       
          <Tabs.Screen  
          name="home" 
           options={{
            title :"Home",
             tabBarIcon:({
              color , size})=>
              (<Ionicons
               name="home"
                size={23}
                 color={color} />)}}/>
           <Tabs.Screen 
                      name="history"  
                      options={{
                        title:"History",
                         tabBarIcon:
                         ({color , size})=> 
                         (<Ionicons
                          name="time"
                           size={23} 
                           color={color} />  )}}/>
       <Tabs.Screen 
            name="profile"
             options={{
                title:"Profile",
                   tabBarIcon:({color , size})=> (
                      <Ionicons 
                          name="person-sharp"
                             size={23}
                               color={color} />  )}}/>
      </Tabs>
    )
  }

  export default TabLayout
