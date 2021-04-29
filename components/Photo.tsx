import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { StackFactoryParamList } from '../navigations/StackNavFactory';
import { seeFeed_seeFeed } from '../__generated__/seeFeed';

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

const Photo: React.FC<seeFeed_seeFeed> = ({
  user: { avatar, username },
  file,
  isLiked,
  likes,
  id,
  caption,
  comments,
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
  return (
    <Container>
      <Header onPress={() => navigation.navigate('Profile')}>
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
          <Action>
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
        <TouchableOpacity onPress={() => navigation.navigate('Likes')}>
          <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Username>{username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};

export default Photo;
