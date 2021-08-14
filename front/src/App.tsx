import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import TabsNav from 'navigators/TabsNav';
import { observer } from 'mobx-react-lite';
import { getUserStore } from 'stores/UserStore';
import { getTreeStore } from 'stores/TreeStore';

const App = observer(() => {
    const { getUser } = getUserStore();
    const { getTree } = getTreeStore();
    const [loading, setLoading] = useState(true);

    const onFinish = () => setLoading(false);

    const preload = async () => {
        const { id } = await getUser();
        await getTree(id);
    };

    if (loading) {
        return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
    }

    return (
        <NavigationContainer>
            <TabsNav />
        </NavigationContainer>
    );
});

export default registerRootComponent(App);
