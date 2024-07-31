import styled from "styled-components";
import { useState } from "react";
import { mobile } from "../responsive";
import HorizontalLineWithCenteredTextComponent from "./HorizontalLineWithText";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  width: 100vw;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  margin-top: 10px;
  padding: 20px;
  background-color: #ffffff8e;
  ${mobile({ width: "75%" })}
`;

const Title = styled.p`
  margin: 0;
  font-family: Poppins;
  font-style: normal;
  color: rgb(51, 51, 51);
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })};
  font-size: 33px; 
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const SubTitle = styled.p`
  margin: 0 0 32px 0;
  font-family: Poppins;
  font-style: normal;
  color: rgb(51, 51, 51);
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })};
  font-size: 16px;
  font-weight: 400;
`;

const linkStyle = {
  textDecoration: 'underline', 
  color: 'inherit'
};

const InputBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right: 10px;
`;

const PrivacyPolicy = styled.b`
  margin-left: 37px;
`;

const InputButton = styled.input`
  font-size:22px;
  width: 100%;
  font-family: 'Poppins';
  border: none;
  margin-top: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #c0c0be;
  border-radius: 40px;
  color: white;
  cursor: pointer;
`;

const SignFrame = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }
  const [user,setUser]=useState({
    name:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    ConfirmPassword:"",
  });

	async function registerUser(event) {
    event.preventDefault()
    if(isChecked===true){
      const response = await fetch(`${backendUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log(response);  
      const data = await response.json()
      console.log(data);
  
      if(response.ok){
        setUser({name:"", lastname:"", username:"", email:"", password:"", ConfirmPassword:"", AgreeBox:false});
        navigate("/login");
      }
    }
    else{
      alert("Accept Privacy Policy");
    }
	}
  
  const handleInput = (e) =>{
    let name=e.target.name;
    let value= e.target.value;
    console.log(e);

    setUser({
      ...user,
      [name]:value,
    });
  };

  

  return (
    <div>
      <Container>
      <Wrapper>
        <Title>Sign up</Title>
        
        <SubTitle>Already have an account?<Link to="/Login" style={linkStyle}>Log in</Link></SubTitle>
        <HorizontalLineWithCenteredTextComponent>Create an Account</HorizontalLineWithCenteredTextComponent>
        <Form onSubmit={registerUser}>
          <Input value={user.name} onChange={handleInput} name="name" type="text" placeholder="name" />
          <Input value={user.lastname} onChange={handleInput } name="lastname" type="text" placeholder="last name" />
          <Input value={user.username} onChange={handleInput} name="username" type="text" placeholder="username" />
          <Input value={user.email} onChange={handleInput } name="email" type="email" placeholder="email" />
          <Input value={user.password} onChange={handleInput} name="password" type="password" placeholder="password" />
          <Input value={user.ConfirmPassword} onChange={handleInput} name="ConfirmPassword" type="password" placeholder="confirm password" />
          
          <Agreement>
          <InputBox
              type="checkbox"
              name="AgreeBox"
              checked={isChecked}
              onChange={checkHandler}
            />
            By creating an account, I consent to the processing of my personal
            data in accordance with the <PrivacyPolicy>PRIVACY POLICY</PrivacyPolicy>
          </Agreement>
          <InputButton
              type="submit"
              value="Create Account"
            />
        </Form>
      </Wrapper>
    </Container>
    </div>
  )
}

export default SignFrame
