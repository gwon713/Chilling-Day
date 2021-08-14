import {registerRootComponent} from 'expo';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabsNav from './navigators/TabsNav';

const App = () => {
    return (
        <NavigationContainer>
            <TabsNav />
        </NavigationContainer>
    );
};

export default registerRootComponent(App);
