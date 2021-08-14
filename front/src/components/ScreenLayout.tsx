import React from 'react';
import { View } from 'react-native';

export default function ScreenLayout({ children }) {
    return (
        <View
            // eslint-disable-next-line react-native/no-color-literals
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
