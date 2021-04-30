import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { Props } from '../navigations/StackNavFactory';
import {
  searchPhotos,
  searchPhotosVariables,
} from '../__generated__/searchPhotos';

export const SEARCH_PHOTOS_QUERY = gql`
  query searchPhotos($keyword: String!, $lastId: Int) {
    searchPhotos(keyword: $keyword, lastId: $lastId) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

interface IInputProps {
  width: number;
}

const Input = styled.TextInput<IInputProps>`
  width: ${(props) => props.width / 1.5}px;
  background-color: white;
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
`;

interface ISearchForm {
  keyword: string;
}

const Search = ({ navigation }: Props) => {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const [search, { loading, data, called }] = useLazyQuery<
    searchPhotos,
    searchPhotosVariables
  >(SEARCH_PHOTOS_QUERY);
  const {
    setValue,
    register,
    handleSubmit,
    getValues,
  } = useForm<ISearchForm>();
  const onValid = () => {
    const { keyword } = getValues();
    search({
      variables: {
        keyword,
        lastId: 0,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue('keyword', text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword', { required: true, minLength: 3 });
  }, []);
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Photo', {
          id: photo.id,
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
        }}
      >
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => photo!.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
