import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import styles from './sidebar.module.css'
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
const Menu = styled.div`
  margin:0;
  padding:20px;
  border-radius:5px;
  -webkit-box-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22); 
  ox-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22);
  background:white;
  height:100% !important
`

const OrderList = styled.ul`
  list-style:none;
  padding-left:0
`

const ListItem = styled.li`
  padding:8px 10px;
  transition:all 0.2s;
  border-radius:8px;
  margin-bottom:5px;
  &:hover{
    background:black;
  };
  &:hover a{
    color:white !important
  };
`

const DashboardAdmin = () => {
  const location = useLocation()
  const { pathname } = location
  return (
    <Menu>
      <OrderList>
        <ListItem className={`${pathname.startsWith('/admin/chart') && styles.active}`}>
          <Link style={{ color: pathname.startsWith('/admin/chart') ? 'white' : 'black' }} className={styles.link} to='/admin/chart'>
          <InsertChartRoundedIcon /> Chart
            </Link>
        </ListItem>
        <ListItem className={`${pathname.startsWith('/admin/user') && styles.active}`}>
          <Link style={{ color: pathname.startsWith('/admin/user') ? 'white' : 'black' }} className={styles.link} to='/admin/userlist'>
          <i className="mr-2 fas fa-user-friends"></i>User
            </Link>
        </ListItem>
        <ListItem className={`${pathname.startsWith('/admin/product') && styles.active}`}>
          <Link style={{ color: pathname.startsWith('/admin/product') ? 'white' : 'black' }} className={styles.link} to='/admin/productlist'>
          <i className="mr-2 fas fa-industry"></i>Product
            </Link>
        </ListItem>
        <ListItem className={`${pathname.startsWith('/admin/orderlist') && styles.active}`}>
          <Link style={{ color: pathname.startsWith('/admin/orderlist') ? 'white' : 'black' }} className={styles.link} to='/admin/orderlist'>
          <i className="mr-2 fas fa-wallet"></i>Orders
            </Link>
        </ListItem>
      </OrderList>
    </Menu>
  )
}

export default DashboardAdmin
