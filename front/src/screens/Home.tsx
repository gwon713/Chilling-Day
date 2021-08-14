/* eslint-disable  */
import ScreenLayout from '../components/ScreenLayout';
import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native';
import styled from 'styled-components/native';
import UploadNav from '../navigators/UploadNav';
import { NavigationContainer } from '@react-navigation/native';

const Chillbutton = styled.TouchableOpacity`
    border-radius: 50px;
    border: 2px solid black;
    padding: 10px 20px;
`;

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const takePhotoBtnClick = () => {
        navigation.navigate(UploadNav);
    };
    const albumBtnClick = () => {};

    return (
        <ScreenLayout>
            <Text>Set Chilling Day</Text>

            <Chillbutton onPress={() => setModalVisible(!modalVisible)}>
                <Text>Chill</Text>
            </Chillbutton>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // modal has been closed
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        flex: 0.4,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flex: 0.3,
                            flexDirection: 'row',
                        }}>
                        <Text>Chilling 방법 선택</Text>
                        <Chillbutton onPress={() => setModalVisible(!modalVisible)}>
                            <Text>Hide Modal</Text>
                        </Chillbutton>
                    </View>
                    <Chillbutton onPress={() => navigation.navigate('Take') }> 
                        <Text>직접 사진촬영</Text>
                    </Chillbutton>
                    <Chillbutton onPress={() => albumBtnClick}>
                        <Text>앨범에서 선택</Text>
                    </Chillbutton>
                </View>
            </Modal>
        </ScreenLayout>
    );
}
