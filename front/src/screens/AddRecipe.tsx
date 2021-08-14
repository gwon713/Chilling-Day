import Divider from 'components/commons/Divider';
import { GrayText, StrongText } from 'components/commons/Text';
import ScreenLayout from 'components/ScreenLayout';
import CONFIG from 'constants/config';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { getIngredientStore } from 'stores/IngredientStore';
import { getUserStore } from 'stores/UserStore';
import styled from 'styled-components/native';
import { FlatGrid } from 'react-native-super-grid';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const AddRecipe = observer(() => {
    const { username, totalChillingDay } = getUserStore();
    const { getIngredients } = getIngredientStore();

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);

    const selectedIngredients = useMemo(() => {
        return [{}, { id: 3, name: '치즈', size: 1, emissions: 0.021 }];
    }, []);

    return (
        <ScreenLayout justifyContent="flex-start">
            <TopContainer>
                <GrayText style={{ textAlign: 'center' }}>{username}님의</GrayText>
                <StrongText style={{ textAlign: 'center' }}>{totalChillingDay + 1}번째 Chilling</StrongText>
            </TopContainer>

            <Divider height={2} />

            <ImageContainer>
                <Image
                    style={{ width: 300, height: 217, borderRadius: 10 }}
                    source={{ uri: `${CONFIG.API_URL}/image/3265816e71f883a50224d991d7eaa234`, cache: 'only-if-cached' }}
                />
            </ImageContainer>

            <StrongText style={{ width: 300 }}>주성분</StrongText>
            <FlatGrid
                itemDimension={90}
                spacing={0}
                data={selectedIngredients}
                style={styles.gridView}
                renderItem={({ item }) => {
                    if (!item.name) {
                        return (
                            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#E0E0E0' }]}>
                                <Text style={styles.itemName}>+</Text>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <View style={[styles.itemContainer, { backgroundColor: '#FAFAFA' }]}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    );
                }}
            />
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