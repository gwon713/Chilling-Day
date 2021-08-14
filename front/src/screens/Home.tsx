import ProgressCircle from 'components/home/ProgressCircle';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ScreenLayout from 'components/ScreenLayout';
import ChillingButton from 'components/home/ChillingButton';
import { GrayText, HighlightText, StrongText } from 'components/commons/Text';
import { getUserStore } from 'stores/UserStore';
import { getTreeStore } from 'stores/TreeStore';
import { observer } from 'mobx-react-lite';

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

const Home = observer(() => {
    const { userId, username } = getUserStore();
    const { getTreeInfo, treeProgress, remainingDaysForComplete } = getTreeStore();
    const isChillingDay = true;

    useEffect(() => {
        if (userId) {
            getTreeInfo(userId);
        }
    }, [getTreeInfo, userId]);

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
                <ProgressCircle percent={treeProgress} />
            </ProgressCircleContainer>
            <BottomContainer>
                <Text>나무 1그루까지</Text>
                <StrongText>{remainingDaysForComplete} days</StrongText>
                <ChillingButton />
            </BottomContainer>
        </ScreenLayout>
    );
});

export default Home;
