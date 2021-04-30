import { useLazyQuery, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';
import Profiles from '../components/Profile';
import ScreenLayout from '../components/ScreenLayout';
import { PHOTO_FRAGMENT } from '../fragments';
import { useMe } from '../hooks/useMe';
import { Props } from '../navigations/StackNavFactory';
import { seeProfile, seeProfileVariables } from '../__generated__/seeProfile';

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos(page: $page) {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Me = ({ navigation }: Props) => {
  const { data: userData } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: userData?.me?.username,
    });
    if (userData?.me?.username) {
      me({
        variables: {
          username: userData.me.username,
          page: 1,
        },
      });
    }
  }, [userData]);
  const [me, { data, loading }] = useLazyQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY
  );
  return (
    <ScreenLayout loading={loading}>
      {data?.seeProfile && <Profiles {...data.seeProfile} />}
      <TouchableOpacity
        style={{
          backgroundColor: colors.blue,
          paddingVertical: 10,
          marginHorizontal: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={() => logUserOut()}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Log out</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
};

export default Me;
