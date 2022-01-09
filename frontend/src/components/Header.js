import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route,Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { logout } from '../action/userAction'
import SearchBox from './SearchBox'
import styled from 'styled-components'

const TotalItem = styled.span`
  font-weight:bold;
  color:black;
  position:absolute;
  top:-12px;
  left:22px;
  font-size:12px;
  border-radius:50%;
  border:2px solid black;
  width:20px;
  height:20px;
  text-align:center;
  line-height:16px;
`

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const cart = useSelector(state => state.cart)

  const { cartItems } = cart
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar style={{ background: 'white', padding: '0px 72px' }} expand="md" collapseOnSelect>
        <LinkContainer to='/'>
          <Navbar.Brand >
            <Image style={{ width: '100px', height: '100px' }} src="/images/logo.png" alt='logo-website' />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history
            ={history} />} />
          <Nav className="ml-auto">
            <LinkContainer to='/cart'>
              <Nav.Link >
                <i style={{ fontSize: '24px', position: 'relative',marginRight:'6px' }} className="fas fa-shopping-cart" >
                  {cartItems.length > 0 && <TotalItem>{cartItems.length}</TotalItem>}
                </i>

                Cart
              </Nav.Link>
            </LinkContainer>
            {
              userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href="/login">Sign In</Nav.Link>
                </LinkContainer>
              )
            }
            {userInfo && userInfo.isAdmin && (
              <LinkContainer to='/admin/userlist'>
                <Nav.Link >Dashboard</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header

