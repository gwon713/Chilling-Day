import { Alert, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import styled from "styled-components/native";
import * as MediaLibrary from 'expo-media-library';

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Actions = styled.View`
    flex: 0.35;
    padding: 0px 50px;
    align-items: center;
    justify-content: space-around;
`;

const PhotoActions = styled(Actions)`
    flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    padding: 10px 25px;
    border-radius: 4px;
`;

const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ActionsContainer = styled.View`
    flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 20px;
    left: 20px;
`;

const TakePhotoBtn = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TakePhoto({ navigation }) {
    const cameraRef = useRef(null);
    const [ takenPhoto, setTakenPhoto ] = useState("");
    const [ cameraReady, setCameraReady ] = useState(false);
    const [ ok, setOk ] = useState(false);
    const [ flashMode, setFlashMode ] = useState(Camera.Constants.FlashMode.off);
    const [ zoom, setZoom ] = useState(0);
    const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back);

    const getPermissions = async () => {
        const { granted } = await Camera.requestPermissionsAsync();
        setOk(granted);
    };

    useEffect(() => {
        getPermissions();
    }, []);

    const onCameraSwitch = () => {
        if (cameraType === Camera.Constants.Type.front) {
          setCameraType(Camera.Constants.Type.back);
        } else {
          setCameraType(Camera.Constants.Type.front);
        }
    };

    // const onZoomValueChange = (e) => {
    //     setZoom(e);
    // };

    const onFlashChange = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
          setFlashMode(Camera.Constants.FlashMode.on);
        } else if (flashMode === Camera.Constants.FlashMode.on) {
          setFlashMode(Camera.Constants.FlashMode.auto);
        } else if (flashMode === Camera.Constants.FlashMode.auto) {
          setFlashMode(Camera.Constants.FlashMode.off);
        }
    };

    const goToUpload = async (save) => {
        if (save) {
          await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }
        navigation.navigate("UploadForm", {
          file: takenPhoto,
        });
    };

    const onUpload = () => {
        Alert.alert("Save photo?", "Save photo & upload or just upload", [
          {
            text: "Save & Upload",
            onPress: () => goToUpload(true),
          },
          {
            text: "Just Upload",
            onPress: () => goToUpload(false),
          },
        ]);
    };

    const onCameraReady = () => setCameraReady(true);

    const takePhoto = async () => {
        if (cameraRef.current && cameraReady) {
            const { uri } = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            setTakenPhoto(uri);
        }
    };
    const onDismiss = () => setTakenPhoto("");

    return (
        <Container>
            {takenPhoto === "" ? (
                <Camera 
                    type={cameraType} 
                    style={{ flex: 1 }} 
                    zoom={zoom}
                    flashMode={flashMode}
                    ref={cameraRef}
                    onCameraReady={onCameraReady}
                >
                    <CloseButton onPress={() => navigation.navigate("Tabs")}>
                        <Ionicons name="close" color="white" size={30}/>
                    </CloseButton>
                </Camera>
            ) : (
                <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
            )}
            {takenPhoto === "" ? (
                <Actions>
                    <ButtonsContainer>
                        <TakePhotoBtn onPress={takePhoto}/>
                        <ActionsContainer>
                            <TouchableOpacity
                                onPress={onFlashChange}
                            >
                                <Ionicons 
                                    size={30}
                                    color="white"
                                    name="ios-flash-outline"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onCameraSwitch}
                            >
                                <Ionicons 
                                    size={30}
                                    color="white"
                                    name={
                                        cameraType === Camera.Constants.Type.front
                                            ? "camera-reverse"
                                            : "camera"
                                    }
                                />
                            </TouchableOpacity>
                        </ActionsContainer>
                    </ButtonsContainer>
                </Actions>
            ) : (
                <PhotoActions>
                    <PhotoAction onPress={onDismiss}>
                        <Text>Dismiss</Text>
                    </PhotoAction>
                    <PhotoAction onPress={onUpload}>
                        <Text>Upload</Text>
                    </PhotoAction>
                </PhotoActions>
            )}
        </Container>
    );
}