import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import SharedStackNav from './SharedStackNav';

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home">{() => <SharedStackNav screenName="Home" />}</Tabs.Screen>
        </Tabs.Navigator>
    );
}
