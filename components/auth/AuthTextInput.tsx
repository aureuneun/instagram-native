import styled from 'styled-components/native';

interface ITextInputProps {
  lastOne?: boolean;
}

const TextInput = styled.TextInput<ITextInputProps>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? '15' : 8)}px;
`;

export default TextInput;
