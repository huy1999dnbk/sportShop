import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import DashboardAdmin from '../../screens/DashboardAdmin/DashboardAdmin'
import styled from 'styled-components'

const WrappepContainer = styled.div`
  padding:0;
`
const DashBoard = styled.div`
  padding:10px;
  border-radius:5px;
  -webkit-box-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22); 
  ox-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22);
`
const AdminRoute = ({ Component, ...restRoute }) => {
  return <Route {...restRoute} render={(propsRoute => (
    <WrappepContainer>
      <Row>
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
