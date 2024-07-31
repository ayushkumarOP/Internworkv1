import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const InputWithTitle = ({ title, ...rest }) => (
  <InputContainer>
    <Title>{title}</Title>
    <InputField {...rest} />
  </InputContainer>
);

export default InputWithTitle;
