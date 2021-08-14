import COLORS from 'constants/colors';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import CameraSelectModal from './CameraSelectModal';

const ChillButtonContainer = styled.TouchableOpacity`
    margin-top: 20px;
    width: 160px;
    height: 44px;
    background-color: white;
    border: 1px solid ${COLORS.MAIN};
    border-radius: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const ChillButtonText = styled.Text`
    font-weight: 700;
    color: ${COLORS.MAIN};
`;

export default function ChillingButton() {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <ChillButtonContainer onPress={openModal}>
                <ChillButtonText>Chill</ChillButtonText>
            </ChillButtonContainer>
            <CameraSelectModal modalVisible={modalVisible} closeModal={closeModal} />
        </>
    );
}
