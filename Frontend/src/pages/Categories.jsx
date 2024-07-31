import React from 'react'
import Sidebar from '../components/Sidebar'
import NavbarAdmin from '../components/Navbar_admin'
import ManageCategory from '../components/Category/ManageCategory'

const categories = () => {
  return (
    <div >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2}}>
      <NavbarAdmin />
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 1}} >
       <Sidebar/>
    </div>
    <ManageCategory/>
  </div>
  )
}

export default categories
