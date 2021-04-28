import React from 'react';
import styled from 'styled-components/native';

const SFormError = styled.Text`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 5px;
  text-align: center;
`;

interface IFormErrorProps {
  message: string;
}

const FormError: React.FC<IFormErrorProps> = ({ message }) => {
  return <SFormError>{message}</SFormError>;
};

export default FormError;
