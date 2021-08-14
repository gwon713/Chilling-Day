import Divider from 'components/commons/Divider';
import { StrongText } from 'components/commons/Text';
import React from 'react';
import { Modal, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getIngredientStore } from 'stores/IngredientStore';
import styled from 'styled-components/native';

const ModalContentContainer = styled.View`
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 32px 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;
const CloseButtonContainer = styled.View`
    position: absolute;
    right: 0;
`;
const CloseButton = styled.TouchableNativeFeedback``;

export default function AddIngredientModal({ modalVisible, closeModal, selectedIngredients, setSelectedIngredients }) {
    const { ingredients } = getIngredientStore();

    const handleIngredientClick = (ingredient) => () => {
        console.log(ingredient);
        setSelectedIngredients((ingredients) => [...ingredients, ingredient]);
        closeModal();
    };

    return (
        <Modal animationType="slide" visible={modalVisible} onRequestClose={closeModal} presentationStyle="pageSheet">
            <ModalContentContainer>
                <View style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <StrongText style={{ textAlign: 'center' }}>주성분 추가</StrongText>
                    <CloseButtonContainer>
                        <CloseButton onPress={closeModal}>
                            <Text>X</Text>
                        </CloseButton>
                    </CloseButtonContainer>
                </View>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    {ingredients.map((ingredient) => {
                        const isAlreadySelected = selectedIngredients.some(({ name }) => name === ingredient.name);

                        if (isAlreadySelected) {
                            return (
                                <React.Fragment key={ingredient.id}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: '#bdbdbd',
                                            marginTop: 16,
                                            marginBottom: 16,
                                        }}>
                                        {ingredient.name}
                                    </Text>
                                    <Divider />
                                </React.Fragment>
                            );
                        }

                        return (
                            <React.Fragment key={ingredient.id}>
                                <TouchableOpacity style={{ marginTop: 16, marginBottom: 16 }} onPress={handleIngredientClick(ingredient)}>
                                    <Text style={{ textAlign: 'center' }}>{ingredient.name}</Text>
                                </TouchableOpacity>
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </ScrollView>
            </ModalContentContainer>
        </Modal>
    );
}
