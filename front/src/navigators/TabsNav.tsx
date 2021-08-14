import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Home from 'screens/Home';
import Community from 'screens/Community';
import COLORS from 'constants/colors';

const Tab = createBottomTabNavigator();

export default function TabsNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Community') {
                        iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.MAIN,
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Community" component={Community} />
        </Tab.Navigator>
    );
}
