import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import TabsNav from 'navigators/TabsNav';

const App = () => {
    const [loading, setLoading] = useState(true);

    const onFinish = () => setLoading(false);

    const preload = async () => {
        // login
    };

    if (loading) {
        return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
    }

    return (
        <NavigationContainer>
            <TabsNav />
        </NavigationContainer>
    );
};

export default registerRootComponent(App);
