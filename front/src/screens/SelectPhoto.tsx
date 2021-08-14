
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

export default function SelectPhoto({ navigation }) {
    const [ ok, setOk ] = useState(false);
    const [ photo, setPhoto ] = useState(null);
    const [ photoUri, setPhotoUri ] = useState("");

    const getPhotos = async () => {
        const { assets: photos } = await MediaLibrary.getAssetsAsync();
        setPhoto(photos[0]);
        setPhotoUri(photos[0]?.uri);
    };
    const getPermissions = async () => {
        const {
            accessPrivileges,
            canAskAgain,
        } = await MediaLibrary.getPermissionsAsync();
        if(accessPrivileges === "none" && canAskAgain){
            const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
            if(accessPrivileges !== "none"){
                setOk(true);
                getPhotos();
            }
        } else if(accessPrivileges !== "none"){
            setOk(true);
            getPhotos();
        }
    };

    const HeaderRight = () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("UploadForm", {
                file: photoUri,
            })}
        >
            <Text>Next</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        getPermissions();
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight,
        });
    }, [photoUri]);
    
    return (
        <Container>
            {photoUri !== "" ? (
                <Image 
                    source={{ uri: photoUri }}
                    style={{ height: "100%" }}
                />
            ) : null}
        </Container>
    );
}
