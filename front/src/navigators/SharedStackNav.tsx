import React from 'react';
import { createStackNavigator, StackHeaderInterpolatedStyle } from "@react-navigation/stack";
import Home from "../screens/Home";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }){
    return (
        <Stack.Navigator>
            {screenName === "Home" ? (
                <Stack.Screen 
                    name={"Home"}
                    component={Home}
                />
            ) : null}
        </Stack.Navigator>
    );
}