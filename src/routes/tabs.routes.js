import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Favorites from '../screens/Favorites';
import StackRoutes from './stack.routes';
import { COLORS, FONTS } from '../constants';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const TabRoutes = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.lightBlue,
                tabBarInactiveTintColor: "rgba(0,0,0,0.6)",
                tabBarStyle: [
                    {
                        height: '8%',
                        backgroundColor: "#FFFFFF",
                    },
                    null,
                ],
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: FONTS.robotoRegular
                }
            }}>
            <Tab.Screen name='Repositórios'
                component={StackRoutes}
                options={(route) => ({
                   
                   
                        tabBarIcon: ({ focused }) => (
                            <AntDesign
                                name='github'
                                color={focused ? COLORS.lightBlue : "rgba(0,0,0,0.6)"}
                                size={24}
    
                            />
                        ),
                        tabBarStyle: ((route) => {
                            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                            if (routeName === 'Details') {
                                return { display: 'none' }
                            }
                            return { backgroundColor: '#fff' }
                        })(route), 
                        
                    }
                )}
            />
            <Tab.Screen name='Favoritos'
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name='star'
                            color={focused ? COLORS.lightBlue : "rgba(0,0,0,0.6)"}
                            size={24}

                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabRoutes

const styles = StyleSheet.create({})