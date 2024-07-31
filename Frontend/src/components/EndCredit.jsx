import React from 'react'
import styled from '@emotion/styled'
const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
`;
const Left = styled.div`
    flex:1;
    text-align: left;
    margin-left: 2%;
`
const Right = styled.div`
    flex:1;
    text-align: right;
    margin-right: 2%;
`
const Span = styled.span`
    text-decoration: underline;
`


const EndCredit = () => {
  return (
    <Container>
        <Left>©2024 Copyright Simco Automotive Electricals. All Rights Reserved.</Left>
        <Right>Designed and Developed by <Span>Easy Solution 360</Span></Right>
    </Container>
  )
}

export default EndCredit