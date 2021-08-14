import ProgressCircle from 'components/home/ProgressCircle';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ScreenLayout from 'components/ScreenLayout';
import ChillingButton from 'components/home/ChillingButton';
import { GrayText, HighlightText, StrongText } from 'components/commons/Text';
import { getUserStore } from 'stores/UserStore';
import { getTreeStore } from 'stores/TreeStore';
import { observer } from 'mobx-react-lite';
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
const RemainingDaysForCompleteContainer = styled.View`
    opacity: ${({ hidden }: { hidden: boolean }) => (hidden ? 0 : 1)};
`;

function HomeScreen({ navigation }) {
    const { username, isChillingDay, remainingDaysUntilChilling } = getUserStore();
    const { treeProgress, remainingDaysForComplete } = getTreeStore();

    return (
        <ScreenLayout>
            <TopContainer>
                <GrayText>안녕하세요 {username}님</GrayText>
                {isChillingDay ? (
                    <StrongText>
                        오늘은 <HighlightText>칠링데이</HighlightText>입니다!
                    </StrongText>
                ) : (
                    <StrongText>
                        칠링데이까지 <HighlightText>{remainingDaysUntilChilling}</HighlightText>일 남았습니다.
                    </StrongText>
                )}
            </TopContainer>
            <ProgressCircleContainer>
                <ProgressCircle percent={treeProgress} />
            </ProgressCircleContainer>
            <BottomContainer>
                <RemainingDaysForCompleteContainer hidden={!isChillingDay}>
                    <Text style={{ textAlign: 'center' }}>나무 1그루까지</Text>
                    <StrongText style={{ textAlign: 'center' }}>{remainingDaysForComplete} days</StrongText>
                </RemainingDaysForCompleteContainer>
                <ChillingButton navigation={navigation} disabled={!isChillingDay} />
                {!isChillingDay ? <GrayText>Chilling day 재설정</GrayText> : null}
            </BottomContainer>
        </ScreenLayout>
    );
}

export default function Home() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="Take" options={{ headerShown: false }} component={TakePhoto} />
            <Stack.Screen name="Select" options={{ title: 'Choose a photo', headerShown: false }} component={SelectPhoto} />
            <Stack.Screen name="UploadForm" options={{ headerShown: false }} component={UploadForm} />
        </Stack.Navigator>
    );
}
