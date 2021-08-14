import Divider from 'components/commons/Divider';
import { GrayText, HighlightText, StrongText } from 'components/commons/Text';
import ScreenLayout from 'components/ScreenLayout';
import CONFIG from 'constants/config';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { getIngredientStore } from 'stores/IngredientStore';
import { getUserStore } from 'stores/UserStore';
import styled from 'styled-components/native';
import { getTempStore } from 'stores/TempStore';
import COLORS from 'constants/colors';
import { useNavigation } from '@react-navigation/core';

const TopContainer = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
`;

const ImageContainer = styled.View`
    margin-top: 25px;
    margin-bottom: 25px;
`;

const GoNextButtonContainer = styled.View`
    width: 100%;
    height: 100px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const GoNextButton = styled.TouchableOpacity`
    background-color: white;
    padding: 10px;
    border: 1px solid ${COLORS.MAIN};
    border-radius: 200px;
`;

const Result = observer(() => {
    const navigation = useNavigation();
    const { username, totalChillingDay } = getUserStore();
    const { photoUrl } = getTempStore();
    const { getIngredients } = getIngredientStore();
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleGoNextPress = () => {
        // navigation.navigate();
    };

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);

    useEffect(() => {
        setSelectedIngredients([...selectedIngredients, { id: 3, name: '치즈', size: 1, emissions: 0.021 }]);
    }, []);

    return (
        <ScreenLayout justifyContent="flex-start">
            <TopContainer>
                <GrayText style={{ textAlign: 'center' }}>{username}님의</GrayText>
                <StrongText style={{ textAlign: 'center' }}>{totalChillingDay + 1}번째 Chilling</StrongText>
            </TopContainer>

            <Divider height={2} />

            <ImageContainer>
                <Image style={{ width: 300, height: 217, borderRadius: 10 }} source={{ uri: photoUrl, cache: 'only-if-cached' }} />
            </ImageContainer>

            <StrongText style={{ width: 300 }}>환경기여도</StrongText>
            <HighlightText style={{ width: 300, textAlign: 'center', fontSize: 80 }}>36%</HighlightText>

            <Divider />

            <GoNextButtonContainer>
                <GoNextButton onPress={handleGoNextPress}>
                    <StrongText>
                        <HighlightText>다음 단계로 넘어가기</HighlightText>
                    </StrongText>
                </GoNextButton>
            </GoNextButtonContainer>
        </ScreenLayout>
    );
});

export default Result;
