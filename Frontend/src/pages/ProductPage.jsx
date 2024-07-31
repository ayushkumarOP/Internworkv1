import Product from "../components/Products/Product"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 98.5vh;
  flex-direction: column;
  padding-top:70px;
`

const ProductPage = () => {
  return (
    <Container>
      <Navbar/>
      <Product/>
      <Footer/>
    </Container>
  )
}

export default ProductPage