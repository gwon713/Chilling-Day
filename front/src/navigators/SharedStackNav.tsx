import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
    return <Stack.Navigator>{screenName === 'Home' ? <Stack.Screen name={'Home'} component={Home} /> : null}</Stack.Navigator>;
}
