import React, { useState } from 'react';
import CameraSelectModal from './CameraSelectModal';
import { LongButtonContainer, LongButtonText } from 'components/LongButton';


export default function ChillingButton({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <LongButtonContainer onPress={openModal}>
                <LongButtonText>Chill</LongButtonText>
            </LongButtonContainer>
            <CameraSelectModal modalVisible={modalVisible} closeModal={closeModal} navigation={navigation} />
        </>
    );
}
