import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import { listUsers } from '../action/userAction'
import { deleteUser } from '../action/userAction'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import styled from 'styled-components'

const TdComponent = styled.td`
  border:none !important;
  padding:18px 5px !important;
  text-align:center;
  font-size:16px
`
const ThComponent = styled.th`
  border:none !important;
  padding:18px 5px !important;
  text-align:center
`

const TableContainer = styled.div`
  border-radius:10px;
  -webkit-box-shadow: 2px 6px 15px -1px #000000; 
  box-shadow: 2px 6px 15px -1px #000000;
`

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }

  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>User</h1>
      {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (
        <TableContainer>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
             
                <ThComponent>Name</ThComponent>
                <ThComponent>Email</ThComponent>
                <ThComponent>Admin</ThComponent>
                <ThComponent>ACTION</ThComponent>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ background: 'white' }}>
              
                  <TdComponent>{user.name}</TdComponent>
                  <TdComponent><a href={`mailto:${user.email}`}> {user.email}</a></TdComponent>
                  <TdComponent>
                    {user.isAdmin ? (<CheckCircleRoundedIcon sx={{color:'green'}} />) : (<HighlightOffRoundedIcon sx={{color:'red'}}/>)}
                  </TdComponent>
                  <TdComponent>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' >
                        <ModeEditOutlineRoundedIcon sx={{color:'blue'}} />
                      </Button>
                    </LinkContainer>
                    <Button className='ml-2' style={{background:'white',borderColor:'green'}} onClick={() => deleteHandler(user._id)}>
                      <DeleteForeverRoundedIcon sx={{color:'green'}} />
                    </Button>
                  </TdComponent>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default UserListScreen
