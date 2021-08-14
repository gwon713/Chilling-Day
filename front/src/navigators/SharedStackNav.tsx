import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Community from '../screens/Community';
import React from 'react';

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
    return (
        <Stack.Navigator>
            {screenName === 'Home' ? <Stack.Screen name={'Home'} options={{ headerShown: false }} component={Home} /> : null}
            {screenName === 'Community' ? <Stack.Screen name={'Community'} options={{ headerShown: false }} component={Community} /> : null}
        </Stack.Navigator>
    );
}
