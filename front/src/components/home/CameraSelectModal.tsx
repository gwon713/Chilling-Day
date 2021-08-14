import { GrayText, StrongText } from 'components/commons/Text';
import COLORS from 'constants/colors';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import styled from 'styled-components/native';

const ModalContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(66, 66, 66, 0.6);
`;
const ModalContentContainer = styled.View`
    background-color: #fff;
    width: 100%;
    height: 235px;
    display: flex;
    justify-content: space-between;
    padding: 32px 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;
const ButtonContainer = styled.TouchableOpacity`
    margin-top: 20px;
    width: 100%;
    height: 44px;
    background-color: ${COLORS.MAIN};
    border: 1px solid white;
    border-radius: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const ButtonText = styled.Text`
    font-weight: 700;
    color: white;
`;
const CloseButtonContainer = styled.View`
    position: absolute;
    right: 0;
`;
const CloseButton = styled.TouchableNativeFeedback``;

export default function CameraSelectModal({ modalVisible, closeModal, navigation }) {
    const handleCameraPress = () => {
        navigation.navigate('Take');
    };
    const handleCameraRollPress = () => {
        navigation.navigate('Select');
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
            <ModalContainer>
                <ModalContentContainer>
                    <View style={{ display: 'flex', justifyContent: 'center' }}>
                        <StrongText style={{ textAlign: 'center' }}>Chilling 방법 선택</StrongText>
                        <GrayText style={{ textAlign: 'center' }}>음식을 분석할 방법을 선택해주세요</GrayText>
                        <CloseButtonContainer>
                            <CloseButton onPress={closeModal}>
                                <Text>X</Text>
                            </CloseButton>
                        </CloseButtonContainer>
                    </View>
                    <View>
                        <ButtonContainer onPress={handleCameraPress}>
                            <ButtonText>직접 사진촬영</ButtonText>
                        </ButtonContainer>
                        <ButtonContainer onPress={handleCameraRollPress}>
                            <ButtonText>앨범에서 선택</ButtonText>
                        </ButtonContainer>
                    </View>
                </ModalContentContainer>
            </ModalContainer>
        </Modal>
    );
}
