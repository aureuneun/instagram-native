import { useApolloClient, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { useMe } from '../hooks/useMe';
import { StackFactoryParamList } from '../navigations/StackNavFactory';
import { followUser, followUserVariables } from '../__generated__/followUser';
import {
  unfollowUser,
  unfollowUserVariables,
} from '../__generated__/unfollowUser';

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
  margin-left: 10px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 5px 10px;
  border-radius: 3px;
`;

const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

interface IUserRowProps {
  avatar: string | null;
  username: string;
  isMe: boolean;
  isFollowing: boolean;
}

const UserRow: React.FC<IUserRowProps> = ({
  avatar,
  username,
  isMe,
  isFollowing,
}) => {
  const navigation = useNavigation<
    StackNavigationProp<StackFactoryParamList, 'Any'>
  >();
  const { cache } = useApolloClient();
  const { data: userData } = useMe();
  const completedUnfollowUser = (data: unfollowUser) => {
    const {
      unfollowUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing: (prev) => {
          return false;
        },
        totalFollowers: (prev) => {
          return prev - 1;
        },
      },
    });
    cache.modify({
      id: `User:${userData?.me?.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation<unfollowUser, unfollowUserVariables>(
    UNFOLLOW_USER_MUTATION,
    {
      onCompleted: completedUnfollowUser,
    }
  );
  const completedFollowUser = (data: followUser) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });
    cache.modify({
      id: `User:${userData?.me?.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [followUser] = useMutation<followUser, followUserVariables>(
    FOLLOW_USER_MUTATION,
    { onCompleted: completedFollowUser }
  );
  return (
    <Wrapper>
      <Container onPress={() => navigation.navigate('Profile', { username })}>
        <Avatar source={{ uri: avatar || '' }} />
        <Username>{username}</Username>
      </Container>
      {!isMe ? (
        <FollowBtn
          onPress={
            isFollowing
              ? () =>
                  unfollowUser({
                    variables: {
                      username,
                    },
                  })
              : () =>
                  followUser({
                    variables: {
                      username,
                    },
                  })
          }
        >
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};

export default UserRow;
