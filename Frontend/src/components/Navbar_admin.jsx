import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  ${mobile({ height: "50px" })};
`;
const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  ${mobile({padding:"10px 0px"})}
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 40px;
  padding: 4px 300px 4px 20px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  padding: 4px;

  &::placeholder {
    color: #999999;
  }
`;

const Search = styled.span`
  color: #666666;
  cursor: pointer;
`;
const Left = styled.div`
  flex: 1;
  margin-left: 30px;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1%;
  gap: 16px;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Logo = styled.img`
  margin-top: -20px;  
  margin-bottom: -20px;
  width: 35%;
`;

const linkStyle = {
  textDecoration: 'none', 
  color: 'inherit'
};

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #0a0909; 
  margin: 0;
`;


const NavbarAdmin = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
        <Link to="/" style={linkStyle}><Logo src="https://i.ibb.co/sWyFHjw/parter.png" /></Link>
        </Left>

        <Center>
        <SearchContainer>
          <Search>
          <SearchIcon/>
          </Search>
            <SearchInput type="text" placeholder="Search" />
        </SearchContainer>
        </Center>

        <Right>
          <NotificationsOutlinedIcon style={{ color: 'white' , fontSize: 30,cursor: 'pointer'}}/>
          <ShoppingBagOutlinedIcon style={{ color: 'white', fontSize: 30,cursor: 'pointer'}}/>
          <PersonOutlinedIcon style={{ color: 'white' , fontSize: 30,cursor: 'pointer' }}/>
        </Right>
       
      </Wrapper>
      <Divider/>
    </Container>
  );
};

export default NavbarAdmin;
