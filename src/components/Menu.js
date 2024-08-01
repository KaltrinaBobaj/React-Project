import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';

function Menu() {
  const [cart, saveCart] = useLocalStorage('cart', [])
  const [user, saveUser] = useLocalStorage('user', [])
  const navigator = useNavigate()

  const handleLogout = e => {
    saveUser({})
    navigator('/')
  }

  return (
    <Nav className="ms-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/shop">Shop</Nav.Link>
      <Nav.Link href="/favorites">Favourites</Nav.Link>
        <Nav.Link href="/cart">Cart ({cart.length})</Nav.Link>

      <NavDropdown title={(user && user.email) ? user.email : 'Guest'} id="basic-nav-dropdown">
        {
          (user && user.email) ? <>
          <NavDropdown.Item href="/dashboard">
          Dashboard
        </NavDropdown.Item>
        <NavDropdown.Divider />
        
        <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
          </> : <>
         <NavDropdown.Item href="/login">Login</NavDropdown.Item>
       
         <NavDropdown.Item href="/register">Register</NavDropdown.Item>
         </>
        }
       
        
      </NavDropdown>
    </Nav>
  )
}

export default Menu
