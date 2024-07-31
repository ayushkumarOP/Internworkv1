import React from 'react'
import Sidebar from '../components/Sidebar'
import NavbarAdmin from '../components/Navbar_admin'
import ManageProduct from '../components/Products/ManageProduct'
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 98.5vh;
  flex-direction: column;
`

const Products = () => {
  return (
    <Container >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2}}>
      <NavbarAdmin />
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 1}} >
       <Sidebar/>
    </div>
    <ManageProduct/>
  </Container>
  )
}

export default Products
