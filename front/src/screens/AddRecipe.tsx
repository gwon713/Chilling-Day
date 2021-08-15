import { GrayText, HighlightText, StrongText } from 'components/commons/Text';
import ScreenLayout from 'components/ScreenLayout';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { getIngredientStore } from 'stores/IngredientStore';
import { getUserStore } from 'stores/UserStore';
import styled from 'styled-components/native';
import { FlatGrid } from 'react-native-super-grid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddIngredientModal from 'components/addRecipe/AddIngredientModal';
import { getTempStore } from 'stores/TempStore';
import COLORS from 'constants/colors';
import { useNavigation } from '@react-navigation/core';
import { getEmissionStore } from 'stores/EmissionStore';

const TopContainer = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
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

const AddRecipe = observer(() => {
    const navigation = useNavigation();
    const { userId, username, totalChillingDay, getUser } = getUserStore();
    const { photoUrl } = getTempStore();
    const { getIngredients } = getIngredientStore();
    const { getEmission } = getEmissionStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleGoNextPress = () => {
        (async () => {
            const user = await getUser(userId);
            getEmission(user.id, selectedIngredients, user.totalChillingDay);
            navigation.navigate('Result');
        })();
    };

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);

    useEffect(() => {
        setSelectedIngredients([
            ...selectedIngredients,
            {
                id: 3,
                name: '치즈',
                size: 1,
                emissions: 0.021,
            },
            {
                id: 6,
                name: '닭고기',
                size: 1,
                emissions: 0.0061,
            },
            {
                id: 8,
                name: '달걀',
                size: 1,
                emissions: 0.0045,
            },
            {
                id: 14,
                name: '채소',
                size: 1,
                emissions: 0.0001,
            },
        ]);
    }, []);

    return (
        <ScreenLayout justifyContent="flex-start">
            <TopContainer>
                <GrayText style={{ textAlign: 'center' }}>{username}님의</GrayText>
                <StrongText style={{ textAlign: 'center' }}>{totalChillingDay}번째 Chilling</StrongText>
            </TopContainer>

            <ImageContainer>
                <Image style={{ width: 300, height: 217, borderRadius: 10 }} source={{ uri: photoUrl, cache: 'only-if-cached' }} />
            </ImageContainer>

            <StrongText style={{ width: 300 }}>주성분</StrongText>
            <FlatGrid
                itemDimension={90}
                spacing={0}
                data={[null, ...selectedIngredients]}
                style={styles.gridView}
                renderItem={({ item }) => {
                    if (!item) {
                        return (
                            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#E0E0E0' }]} onPress={openModal} key={0}>
                                <Text style={styles.itemName}>+</Text>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <View style={[styles.itemContainer, { backgroundColor: '#FAFAFA' }]} key={item.id}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    );
                }}
            />
            <AddIngredientModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
            />
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

export default AddRecipe;

const styles = StyleSheet.create({
    gridView: {
        width: 300,
    },
    itemContainer: {
        borderRadius: 5,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
    },
    itemName: {
        fontSize: 16,
        color: '#8A8A8A',
        fontWeight: '600',
        textAlign: 'center',
    },
});
