import React from 'react';
import styled from 'styled-components';

const HorizontalLineWithCenteredText = styled.div`
  margin: 0px 0px 0px 0px;
  display: flex;
  align-items: center;
`;

const Line = styled.hr`
  flex: 1;
  border: none;
  border-top: 2px solid #818078; 
`;

const Text = styled.p`
  margin: 0px 10px 0px 10px;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  font-variant: normal; /* corrected from Font letiant */
  font-family: Avenir;
  color: rgb(17, 17, 17); /* corrected from Font color */
  text-align: left; /* corrected from Text align */
  text-indent: 0px; /* corrected from Text indent */
  line-height: normal;
  text-transform: none;
  text-decoration: none solid rgb(17, 17, 17);
`;

const HorizontalLineWithCenteredTextComponent = ({ children }) => (
  <HorizontalLineWithCenteredText>
    <Line />
    <Text>{children}</Text>
    <Line />
  </HorizontalLineWithCenteredText>
);

export default HorizontalLineWithCenteredTextComponent;
  
