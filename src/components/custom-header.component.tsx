import React from 'react';
import { View, Text, Image } from 'react-native';
import Settings from 'react-native-vector-icons/Ionicons';

interface CustomHeaderProps {
    name: string
}

const CustomHeader = ({ name }: CustomHeaderProps) => {
  return (
    <View style={{ 
        marginTop: 30,
        width: 70,  alignItems: 'center',}}>
       <Settings onPress={() =>  null} size={19} color='black' name='settings-sharp' /> 
   
    </View>
    
  )
}

export default CustomHeader