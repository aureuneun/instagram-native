import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import RoomItem from '../components/rooms/RoomItem';
import ScreenLayout from '../components/ScreenLayout';
import { ROOM_FRAGMENT } from '../fragments';

export const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default () => {
  const { data, loading, refetch } = useQuery(SEE_ROOMS_QUERY);
  const [refresing, setRefreshing] = useState(false);
  const renderItem = ({ item: room }) => <RoomItem {...room} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          ></View>
        )}
        style={{ width: '100%' }}
        refreshing={refresing}
        onRefresh={onRefresh}
        data={data?.seeRooms}
        keyExtractor={(room) => room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
};
