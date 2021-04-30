import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { StackFactoryParamList } from '../navigations/StackNavFactory';
import { seeFeed_seeFeed } from '../__generated__/seeFeed';
import gql from 'graphql-tag';
import { ApolloCache, FetchResult, useMutation } from '@apollo/client';
import { toggleLike, toggleLikeVariables } from '../__generated__/toggleLike';
import { seePhoto_seePhoto_user } from '../__generated__/seePhoto';

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

const File = styled.Image``;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;

const Caption = styled.View`
  flex-direction: row;
`;

const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;

interface IPhotoProps {
  id: string;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seePhoto_seePhoto_user;
  caption: string | null;
}

const Photo: React.FC<IPhotoProps> = ({
  user: { avatar, username },
  file,
  isLiked,
  likes,
  id,
  caption,
  commentNumber,
}) => {
  const navigation = useNavigation<
    StackNavigationProp<StackFactoryParamList, 'Any'>
  >();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [file]);
  const updateToggleLike = (
    cache: ApolloCache<toggleLike>,
    result: FetchResult<toggleLike, Record<string, any>, Record<string, any>>
  ) => {
    const ok = result?.data?.toggleLike.ok;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked: (prev) => !prev,
          likes: (prev) => {
            return isLiked ? prev - 1 : prev + 1;
          },
        },
      });
    }
  };
  const [toggleLike] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      update: updateToggleLike,
    }
  );
  const goToProfile = () => {
    navigation.navigate('Profile', {
      username,
    });
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        <Avatar resizeMode="cover" source={{ uri: avatar || '' }} />
        <Username>{username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{ width, height: imageHeight }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={() => toggleLike({ variables: { id: +id } })}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              color={isLiked ? 'tomato' : 'white'}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate('Comments')}>
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity onPress={() => navigation.navigate('Likes', { id })}>
          <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};

export default Photo;
