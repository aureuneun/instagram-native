import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import {
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const SelectPhoto = ({ navigation }) => {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const {
      accessPrivileges,
      canAskAgain,
    } = await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none') {
        getPhotos();
      }
    } else if (accessPrivileges !== 'none') {
      getPhotos();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UploadForm', {
          file: chosenPhoto,
        });
      }}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : 'white'}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== '' ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: '100%' }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
};

export default SelectPhoto;
