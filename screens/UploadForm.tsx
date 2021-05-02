import { useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import DismissKeyboard from '../components/DismissKeyboard';
import { FEED_FRAGMENT } from '../fragments';

export const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedFragment
    }
  }
  ${FEED_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const UploadForm = ({ route, navigation }) => {
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          seeFeed: (prev) => {
            return [uploadPhoto, ...prev];
          },
        },
      });
      navigation.navigate('Tab');
    }
  };
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION, {
    update: updateUploadPhoto,
  });
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register('caption');
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, []);
  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: 'image/jpeg',
    });
    uploadPhoto({
      variables: {
        caption,
        file,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue('caption', text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
