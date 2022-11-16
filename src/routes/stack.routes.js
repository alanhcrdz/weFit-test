import React, {useRef} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from 'react-native-vector-icons/Ionicons';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { FONTS, SIZES } from '../constants'
//screens
import Home from '../screens/Home';
import Details from '../screens/Details';
import WebScreen from '../screens/WebScreen';
import Field from '../components/field.component';


const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  const { height } = Dimensions.get('window');
  const bottomSheetRef = useRef(null);



  return (
    <>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{
        headerTitle: 'WeFit',
        headerTitleStyle: {
          fontFamily: FONTS.robotoMedium,
          lineHeight: '160%',
          fontSize: SIZES.large,
        },
        headerRight: () => <Settings onPress={() =>  bottomSheetRef.current?.expand()} size={19} color='black' name='settings-sharp' />

      }} />
      <Stack.Screen name='Details' component={Details} options={{
        headerTitle: 'Detalhes',
        headerTitleStyle: {
          fontFamily: FONTS.robotoMedium,
          lineHeight: '160%',
          fontSize: SIZES.large,

        },
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#000'

        }


      }} />

      <Stack.Screen name='WebScreen' component={WebScreen} options={{
        headerShown: false,
      }} />
    </Stack.Navigator>
    <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[1, height - 560]}
        backgroundStyle={{ backgroundColor: '#fff' }}
        handleIndicatorStyle={{ backgroundColor: '#555' }}
        enableHandlePanningGesture
      >
        <Field />
      </BottomSheet>
    </>


  )
}

export default gestureHandlerRootHOC(StackRoutes)

const styles = StyleSheet.create({})