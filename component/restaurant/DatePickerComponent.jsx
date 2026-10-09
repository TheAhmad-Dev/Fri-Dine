import { View, Text, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import DateTimePicker from "@react-native-community/datetimepicker";


const DatePickerComponent = () => {
const  [show  , setShow]=  useState(false) ;
const [date   , setDate] = useState(new Date())    ; 
const handlePress = () =>{
    setShow(true);
}
return (
    <View   style={{flexDirection:"row"}}>


  <TouchableOpacity onPress={handlePress}  style={{ backgroundColor: "#FFF4E0",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,}}>
  <Text style ={{    color: "#F4A300",
      fontSize: 13,
      fontWeight: "600" , justifyContent:"center" , }}>Select Date</Text>
</TouchableOpacity>

{show && (
  <DateTimePicker
    value={date}
    mode="date"
    display="default"
    minimumDate={new Date()}
    maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
    onChange={(event, selectedDate) => {
      setShow(false);
      if (selectedDate) setDate(selectedDate);
    }}
  />
)}

    </View>
  )
}

export default DatePickerComponent