import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Community from '../screens/Community';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNav(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if(route.name === "Home"){
                        iconName = focused 
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if(route.name === "Community"){
                        iconName = focused 
                            ? 'ios-chatbubbles' 
                            : 'ios-chatbubbles-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Community" component={Community} />
        </Tab.Navigator>
    );
}