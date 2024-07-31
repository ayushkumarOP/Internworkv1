import React from 'react'
import Sidebar from '../components/Sidebar'
import NavbarAdmin from '../components/Navbar_admin'
import ManageBrands from '../components/Brands/ManageBrands'

const Brands = () => {
  return (
    <div >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2}}>
      <NavbarAdmin />
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 1}} >
       <Sidebar/>
    </div>
    <ManageBrands/>
  </div>
  )
}

export default Brands
