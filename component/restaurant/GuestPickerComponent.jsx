import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'

const GuestPickerComponent = ({selectedNumber  , setselectedNumber} ) => {
  
    const   decrement  =()=>{ 
        if(selectedNumber   > 1 )
     setselectedNumber  (selectedNumber - 1 ) ;  
    };
    const increment = ()   =>   {
        if(selectedNumber < 12  )
 setselectedNumber(selectedNumber  + 1 )

    };
  return (
    <View  style={{flexDirection:"row" ,  alignContent :"center", 
        justifyContent:"center"  ,
         padding: 9,
//   borderRadius: 20,
//   borderWidth: 1,
//   borderColor: "#fEA727" 
}}>
     
<TouchableOpacity    onPress={decrement}    style={{
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#fEA727",
    justifyContent: "center",
    alignItems: "center",
  }} >
    <Text    style = {{color:"black" , fontSize : 12  , fontSize: 20, fontWeight: "bold" }} > 
        -
    </Text>
    </TouchableOpacity>  
<Text   style={{ 
  fontSize: 16,
  fontWeight: "bold",
  marginHorizontal: 1  ,
  backgroundColor:"#d4cdcd", 
  paddingLeft: 4 ,
  paddingRight : 4 ,
  color: "black"
}}>
    {selectedNumber}
</Text>
    <TouchableOpacity    onPress={increment}      style={{
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#fEA727",
    justifyContent: "center",
    alignItems: "center",
  }}  >
        
    <Text    style = {{color:"black" , fontSize : 12  , fontSize: 18, fontWeight: "bold"}} > 
        +
    </Text>
    </TouchableOpacity> 

    </View>
  )
}

export default GuestPickerComponent