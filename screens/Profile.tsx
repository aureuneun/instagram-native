import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Profiles from '../components/Profile';
import ScreenLayout from '../components/ScreenLayout';
import { ProfileProps } from '../navigations/StackNavFactory';
import { seeProfile, seeProfileVariables } from '../__generated__/seeProfile';
import { SEE_PROFILE_QUERY } from './Me';

const Profile = ({ route, navigation }: ProfileProps) => {
  const {
    params: { username },
  } = route;
  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);
  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
        page: 1,
      },
    }
  );
  return (
    <ScreenLayout loading={loading}>
      {data?.seeProfile && <Profiles {...data.seeProfile} />}
    </ScreenLayout>
  );
};

export default Profile;
