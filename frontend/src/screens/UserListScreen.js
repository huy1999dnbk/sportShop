import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import LoaderAction from '../components/Loader/LoaderAction'
import { listUsers } from '../action/userAction'
import { deleteUser } from '../action/userAction'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Paginate from '../components/Paginate'
import Modal from '../components/Modal/Modal'
import styled from 'styled-components'

const TdComponent = styled.td`
  border:none !important;
  padding:18px 5px !important;
  text-align:center;
  font-size:16px
  vertical-align: middle !important;
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

const UserListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const [showModal,setShowModal] = useState(false)
  const [userIdDelete,setIdUserDelete] = useState('')
  const userList = useSelector(state => state.userList)
  const { loading, error, users, page, pages } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { loading:loadingDelete, success: successDelete } = userDelete

  useEffect(() => {
    localStorage.setItem('pageNum', JSON.stringify(pageNumber))
    return () => {
      if(history.action === 'POP'){
        window.location.reload()
      }
      localStorage.removeItem('pageNum')
    }
  }, [pageNumber])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(pageNumber))
    } else {
      history.push('/login')
    }

  }, [dispatch, history, successDelete, userInfo, pageNumber])

 

  const confirmModal = () => {
    dispatch(deleteUser(userIdDelete))
    setShowModal(false)
    setIdUserDelete('')
  }

  const closeModal = () => {
    setIdUserDelete('')
    setShowModal(false)
  }
  return (
    <>
      {showModal && <Modal onCancel={closeModal} title='Are you sure' content='Do you want to delete this user?' onConfirm={confirmModal} />}
      <h1>User</h1>
      {loadingDelete && <LoaderAction />}
      {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (
        <TableContainer>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>

                <ThComponent>Name</ThComponent>
                <ThComponent>Phone</ThComponent>
                <ThComponent>Email</ThComponent>
                <ThComponent>Admin</ThComponent>
                <ThComponent>ACTION</ThComponent>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ background: 'white' }}>

                  <TdComponent>{user.name}</TdComponent>
                  <TdComponent>{user.phoneNumber}</TdComponent>
                  <TdComponent><a href={`mailto:${user.email}`}> {user.email}</a></TdComponent>
                  <TdComponent>
                    {user.isAdmin ? (<CheckCircleRoundedIcon sx={{ color: 'green' }} />) : (<HighlightOffRoundedIcon sx={{ color: 'red' }} />)}
                  </TdComponent>
                  <TdComponent>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' >
                        <ModeEditOutlineRoundedIcon sx={{ color: 'blue' }} />
                      </Button>
                    </LinkContainer>
                    <Button className='ml-2' style={{ background: 'white', borderColor: 'green' }} onClick={() => {
                      setShowModal(true)
                      setIdUserDelete(user._id)
                    }}>
                      <DeleteForeverRoundedIcon sx={{ color: 'green' }} />
                    </Button>
                  </TdComponent>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Paginate page={page} pages={pages} isProduct={false} isUsers={true} isAdmin={true} productList={users} />
    </>
  )
}

export default UserListScreen
