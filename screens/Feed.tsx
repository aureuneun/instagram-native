import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { ListRenderItemInfo, FlatList, Text } from 'react-native';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import { Props } from '../navigations/StackNavFactory';
import { seeFeed, seeFeed_seeFeed } from '../__generated__/seeFeed';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Feed = ({ navigation }: Props) => {
  const { data, loading, refetch } = useQuery<seeFeed>(FEED_QUERY);
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = ({
    item: photo,
  }: ListRenderItemInfo<seeFeed_seeFeed | null>) => {
    return photo ? <Photo {...photo} /> : null;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      {data?.seeFeed && (
        <FlatList
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          data={data.seeFeed}
          keyExtractor={(item) => item!.id}
          renderItem={renderItem}
        />
      )}
    </ScreenLayout>
  );
};

export default Feed;
