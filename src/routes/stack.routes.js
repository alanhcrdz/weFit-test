import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from 'react-native-vector-icons/Ionicons'

import { FONTS, SIZES } from '../constants'
//screens
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{
        headerTitle: 'WeFit',
        headerTitleStyle: {
          fontFamily: FONTS.robotoMedium,
          lineHeight: '160%',
          fontSize: SIZES.large,
        },
        headerRight: () => <Settings size={19} color='black' name='settings-sharp' />

      }} />
    </Stack.Navigator>
  )
}

export default StackRoutes

const styles = StyleSheet.create({})