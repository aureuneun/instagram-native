import { useMutation } from '@apollo/client';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import gql from 'graphql-tag';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { logUserIn } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import TextInput from '../components/auth/AuthTextInput';
import FormError from '../components/auth/FormError';
import { StackParamList } from '../navigations/LoggedOutNav';
import { login, loginVariables } from '../__generated__/login';

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

type Props = {
  route: RouteProp<StackParamList, 'Login'>;
  navigation: StackNavigationProp<StackParamList, 'Login'>;
};

interface ILoginForm {
  username: string;
  password: string;
}

const Login = ({ route }: Props) => {
  const onCompleted = (data: login) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      logUserIn(token);
    }
  };
  const [login, { loading, data: loginData }] = useMutation<
    login,
    loginVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: route.params?.username,
      password: route.params?.password,
    },
  });
  const passwordRef = useRef(null);
  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };
  const onValid = (data: ILoginForm) => {
    if (loading) {
      return;
    }
    login({
      variables: {
        ...data,
      },
    });
  };
  useEffect(() => {
    register('username', { required: 'Username is required.' });
    register('password', { required: 'Password is required.' });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch('username')}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      {errors.username?.message && (
        <FormError message={errors.username.message} />
      )}
      <TextInput
        value={watch('password')}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      {errors.password?.message && (
        <FormError message={errors.password.message} />
      )}
      <AuthButton
        text="Log in"
        disabled={!watch('username') || !watch('password')}
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
      {loginData?.login.error && <FormError message={loginData.login.error} />}
    </AuthLayout>
  );
};

export default Login;
