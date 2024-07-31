import Footer from "../components/Footer"
import LoginFrame from "../components/LoginFrame"
import Navbar from "../components/Navbar"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 98.5vh;
  flex-direction: column;
  padding-top:70px;
`

const Login = () => {
  
  return (
    <Container>
      <Navbar/>
      <LoginFrame/>
      <Footer/>
    </Container>
  )
}

export default Login
