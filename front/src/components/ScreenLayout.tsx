/* eslint-disable */
import React from 'react';
import { View } from 'react-native';

export default function ScreenLayout({ children }) {
    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {children}
        </View>
    );
}
