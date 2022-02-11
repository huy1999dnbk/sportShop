import React,{useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { Route,useHistory } from 'react-router-dom'
import DashboardAdmin from '../../screens/DashboardAdmin/DashboardAdmin'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const WrappepContainer = styled.div`
  padding:0;
`
const DashBoard = styled.div`
  padding:10px;
  border-radius:5px;
 
`
const AdminRoute = ({ Component, ...restRoute }) => {
  const history = useHistory()
 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
 
  useEffect(() => {
    if(!userInfo) {
      history.replace('/')
    }
  },[userInfo])


  return <Route {...restRoute} render={(propsRoute => (
    <WrappepContainer>
      <Row style={{minHeight:'80vh'}}>
        <Col md={2}>
          <DashboardAdmin />
        </Col>
        <Col md={10}>
          <DashBoard>
            <Component {...propsRoute} />
          </DashBoard>
        </Col>
      </Row>
    </WrappepContainer>
  ))} />
}

export default AdminRoute
