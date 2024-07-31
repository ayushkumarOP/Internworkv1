import Combined from "../components/Cart/Combined"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 98.5vh;
  flex-direction: column;
  padding-top:70px;
`

const Cart = () => {
  
  return (
    <Container>
      <Navbar/>
      <Combined/>
      <Footer/>
    </Container>
  )
}

export default Cart
