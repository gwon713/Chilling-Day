import ProgressCircle from 'components/home/ProgressCircle';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ScreenLayout from 'components/ScreenLayout';
import ChillingButton from 'components/home/ChillingButton';
import { GrayText, HighlightText, StrongText } from 'components/commons/Text';

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

export default function Home() {
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
                <ChillingButton />
            </BottomContainer>
        </ScreenLayout>
    );
}
