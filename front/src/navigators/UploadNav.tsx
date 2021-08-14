import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Select">
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="Select" options={{ title: 'Choose a photo' }} component={SelectPhoto} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Take" component={TakePhoto} />
        </Tab.Navigator>
    );
}
