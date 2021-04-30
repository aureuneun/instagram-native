import gql from 'graphql-tag';
import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { LikesProps } from '../navigations/StackNavFactory';
import { USER_FRAGMENT } from '../fragments';
import { useQuery } from '@apollo/client';
import {
  seePhotoLikes,
  seePhotoLikes_seePhotoLikes,
  seePhotoLikesVariables,
} from '../__generated__/seePhotoLikes';
import ScreenLayout from '../components/ScreenLayout';
import UserRow from '../components/UserRow';

export const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const Likes = ({ route, navigation }: LikesProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    params: { id },
  } = route;
  const { data, loading, refetch } = useQuery<
    seePhotoLikes,
    seePhotoLikesVariables
  >(LIKES_QUERY, {
    variables: {
      id: +id,
    },
    skip: !id,
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderItem = ({
    item: user,
  }: ListRenderItemInfo<seePhotoLikes_seePhotoLikes | null>) => {
    return user ? <UserRow {...user} /> : null;
  };
  return (
    <ScreenLayout loading={loading}>
      {data?.seePhotoLikes && (
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            ></View>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={{ width: '100%' }}
          data={data.seePhotoLikes}
          keyExtractor={(user) => user!.id}
          renderItem={renderItem}
        />
      )}
    </ScreenLayout>
  );
};

export default Likes;
