import { useMutation } from '@apollo/client';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import gql from 'graphql-tag';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import TextInput from '../components/auth/AuthTextInput';
import FormError from '../components/auth/FormError';
import { StackParamList } from '../navigations/LoggedOutNav';
import {
  createAccount,
  createAccountVariables,
} from '../__generated__/createAccount';

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

type Props = {
  route: RouteProp<StackParamList, 'CreateAccount'>;
  navigation: StackNavigationProp<StackParamList, 'CreateAccount'>;
};

interface ICreateAccountForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const CreateAccount = ({ navigation }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICreateAccountForm>();
  const onCompleted = (data: createAccount) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      const { username, password } = getValues();
      navigation.navigate('Login', {
        username,
        password,
      });
    }
  };
  const [createAccount, { loading, data: createAccountData }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };
  const onValid = (data: ICreateAccountForm) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  useEffect(() => {
    register('firstName', { required: 'FirstName is required.' });
    register('lastName', { required: 'LastName is required.' });
    register('username', { required: 'Username is required.' });
    register('email', { required: 'Email is required.' });
    register('password', { required: 'Password is required.' });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue('firstName', text)}
      />
      {errors.firstName?.message && (
        <FormError message={errors.firstName.message} />
      )}
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue('lastName', text)}
      />
      {errors.lastName?.message && (
        <FormError message={errors.lastName.message} />
      )}
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      {errors.username?.message && (
        <FormError message={errors.username.message} />
      )}
      <TextInput
        ref={emailRef}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('email', text)}
      />
      {errors.email?.message && <FormError message={errors.email.message} />}
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        secureTextEntry
        returnKeyType="done"
        onChangeText={(text) => setValue('password', text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      {errors.password?.message && (
        <FormError message={errors.password.message} />
      )}
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
      {createAccountData?.createAccount.error && (
        <FormError message={createAccountData.createAccount.error} />
      )}
    </AuthLayout>
  );
};

export default CreateAccount;
