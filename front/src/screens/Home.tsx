import ProgressCircle from 'components/home/ProgressCircle';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ScreenLayout from 'components/ScreenLayout';
import ChillingButton from 'components/home/ChillingButton';
import { GrayText, HighlightText, StrongText } from 'components/commons/Text';
import { createStackNavigator } from '@react-navigation/stack';
import TakePhoto from './TakePhoto';
import SelectPhoto from './SelectPhoto';
import UploadForm from './UploadForm';

const TopContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ProgressCircleContainer = styled.View`
    margin-top: 50px;
    margin-bottom: 20px;
`;
const BottomContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function HomeScreen({ navigation }){
    const username = '박상혁';
    const isChillingDay = true;
    return (
        <ScreenLayout>
            <TopContainer>
                <GrayText>안녕하세요 {username}님</GrayText>
                {isChillingDay && (
                    <StrongText>
                        오늘은 <HighlightText>칠링데이</HighlightText>입니다!
                    </StrongText>
                )}
            </TopContainer>
            <ProgressCircleContainer>
                <ProgressCircle percent={80} />
            </ProgressCircleContainer>
            <BottomContainer>
                <Text>나무 1그루까지</Text>
                <StrongText>6 days</StrongText>
                <ChillingButton navigation={navigation}/>
            </BottomContainer>
        </ScreenLayout>
    );
}

export default function Home() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                options={{ headerShown: false }}
                component={HomeScreen} 
            />
            <Stack.Screen 
                name="Take" 
                options={{ headerShown: false }}
                component={TakePhoto} 
            />
            <Stack.Screen 
                name="Select" 
                options={{ title: 'Choose a photo', headerShown: false }} 
                component={SelectPhoto} 
            />
            <Stack.Screen 
                name="UploadForm"
                options={{ headerShown: false }}
                component={UploadForm}
            />
        </Stack.Navigator>
        
    );
}
