import React from 'react';
import styled from 'styled-components/native';
import { seeProfile_seeProfile } from '../__generated__/seeProfile';

const Header = styled.View`
  height: 150px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: #2c2c2c;
  margin-right: 25px;
`;

const Column = styled.View`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const Name = styled.View`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const FirstName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-right: 15px;
`;

const LastName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

const Follow = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const Follower = styled.Text`
  color: white;
  margin-right: 15px;
`;

const Following = styled.Text`
  color: white;
`;

const Bio = styled.Text`
  color: white;
  font-size: 12px;
`;

const Profiles = ({
  avatar,
  totalFollowers,
  totalFollowing,
  firstName,
  lastName,
  bio,
}: seeProfile_seeProfile) => {
  return (
    <Header>
      <Avatar
        resizeMode="cover"
        source={{
          uri: avatar || '',
        }}
      />
      <Column>
        <Name>
          <FirstName>{firstName}</FirstName>
          <LastName>{lastName}</LastName>
        </Name>
        <Follow>
          <Follower>{totalFollowers} followers</Follower>
          <Following>{totalFollowing} following</Following>
        </Follow>
        <Bio>{bio}</Bio>
      </Column>
    </Header>
  );
};

export default Profiles;
