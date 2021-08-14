import React, { useState } from 'react';
import CameraSelectModal from './CameraSelectModal';
import { LongButtonContainer, LongButtonText } from 'components/LongButton';

const ChillButtonText = styled.Text`
    font-weight: 700;
    color: ${({ disabled }: { disabled: boolean }) => (disabled ? '#FFFFFF' : COLORS.MAIN)};
`;

const ChillButtonContainer = styled.TouchableOpacity`
    margin-top: 20px;
    width: 160px;
    height: 44px;
    background-color: ${({ disabled }) => (disabled ? '#EAEAEA' : '#FFFFFF')};
    border: 1px solid ${({ disabled }) => (disabled ? '#EAEAEA' : COLORS.MAIN)};

    border-radius: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ChillingButton({ navigation, disabled }) {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <ChillButtonContainer onPress={openModal} disabled={disabled}>
                <ChillButtonText disabled={disabled}>Chill</ChillButtonText>
            </ChillButtonContainer>
            <CameraSelectModal modalVisible={modalVisible} closeModal={closeModal} navigation={navigation} />
        </>
    );
}
