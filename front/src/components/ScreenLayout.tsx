import React from 'react';
import { FlexAlignType, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface ScreenLayoutProps {
    alignItems?: FlexAlignType;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    children: React.ReactNode;
}

export default function ScreenLayout({ alignItems = 'center', justifyContent = 'center', children }: ScreenLayoutProps) {
    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
                alignItems,
                justifyContent,
            }}>
            {children}
            <StatusBar style="auto" />
        </View>
    );
}
