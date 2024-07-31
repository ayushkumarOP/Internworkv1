import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SignFrame from "../components/SignFrame"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 98.5vh;
  flex-direction: column;
  padding-top:70px;
`

const signup = () => {
  return (
    <Container>
      <Navbar/>
      <SignFrame/>
      <Footer/>
    </Container>
  )
}

export default signup
