import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';
import { PHOTO_FRAGMENT } from '../fragments';
import { PhotoProps } from '../navigations/StackNavFactory';
import { seePhoto, seePhotoVariables } from '../__generated__/seePhoto';

export const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Photos = ({ route, navigation }: PhotoProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    params: { id },
  } = route;
  const { data, loading, refetch } = useQuery<seePhoto, seePhotoVariables>(
    SEE_PHOTO_QUERY,
    {
      variables: { id: +id },
    }
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: 'black' }}
        contentContainerStyle={{
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data?.seePhoto && <Photo {...data.seePhoto} />}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Photos;
