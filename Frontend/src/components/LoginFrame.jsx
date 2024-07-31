import styled from "styled-components";
import { useState } from "react";
import { mobile } from "../responsive";
import HorizontalLineWithCenteredTextComponent from "./HorizontalLineWithText";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  width: 40%;
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

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  color: rgb(25, 24, 24);
  font-size: 16px;
  font-family: Noto Sans;
  flex: 1;
  padding: 10px;
  width: 38vw; 
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

const Label = styled.label`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  font-family: 'Poppins', sans-serif;
  color: rgb(102, 102, 102);
  background-color: rgba(0, 0, 0, 0);
  text-align: left;
  text-indent: 0px;
  line-height: normal;
  text-decoration: none solid rgb(102, 102, 102);
`;
const Labelbox = styled.label`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  font-family: 'Poppins';
  text-align: left;
  text-indent: 0px;
  line-height: normal;
`;
const InputBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-right: 10px;
`;

const DivIn = styled.div`
  margin-top: 32px;
`;

const linkStyle = {
  marginTop: '10px',
  marginLeft: '390px',
  textDecoration: 'underline', 
  color: 'inherit',
  fontSize: '16px',      
  fontFamily: 'Poppins'    
};
const linkStyle2 = {
  textDecoration: 'underline', 
  color: 'inherit'   
};


const LoginFrame = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = () => {
    setRememberMe((prev)=>!prev);
  };

  const [user,setUser]=useState({
    email:"",
    password:"",
  });
  
  async function loginUser(event) {
    event.preventDefault()
		const response = await fetch(`${backendUrl}/api/users/login`, {
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
      setUser({email:"", password:"", rememberMe:false});
      navigate("/");
      alert("Login Successful!!")
    }
    else {
      
      navigate("/login");
      alert("Invalid username or password. Please try again.");
      setUser({ email: "", password: "" });
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
        <Title>Log in</Title>
        <SubTitle>Don't have an account?<Link to="/Signup" style={linkStyle2}>Sign up</Link></SubTitle>
        <HorizontalLineWithCenteredTextComponent>Or continue with email</HorizontalLineWithCenteredTextComponent>
        <Form onSubmit={loginUser}>
          <DivIn>
          <Label>Email address or Username</Label>
          <Input value={user.email} onChange={handleInput} type="text" name="email"/>
          </DivIn>
          <DivIn>
          <Label>Password</Label>
          <Input value={user.password} onChange={handleInput} type="password" name="password"/>
          </DivIn>
          <Link to="/" style={linkStyle}>Forget your password?</Link>
          <Labelbox>
            <InputBox type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} />
            Remember Me
          </Labelbox>
            <InputButton type="submit" value="Log in" />
        </Form>
      </Wrapper>
    </Container>
    </div>
  )
}

export default LoginFrame
