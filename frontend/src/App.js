import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen'

import ProductScreen from './screens/ProductScreen/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AdminRoute from './routes/AdminRoute/AdminRoute'
import PageNotFound from './screens/NotFound/PageNotFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChartScreen from './screens/Chart/ChartScreen'
import styled from 'styled-components'


const ContainerPage = styled.div`
  padding: 0 10%;
  @media (max-width: 390px) {
    padding: 0 1rem !important;
  }
`

function App() {
 
  return (
 
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <Header />
        <main>
          <ContainerPage>
            <Switch>
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <AdminRoute path='/admin' Component={ChartScreen} exact />
              <AdminRoute path='/admin/userlist' Component={UserListScreen} exact />
              <AdminRoute path='/admin/userlist/:pageNumber' Component={UserListScreen} exact />
              <AdminRoute path='/admin/chart' Component={ChartScreen} />
              <AdminRoute path='/admin/user/:id/edit' Component={UserEditScreen} />
              <AdminRoute path='/admin/productlist' Component={ProductListScreen} exact />
              <AdminRoute path='/admin/productlist/:pageNumber' Component={ProductListScreen} exact />
              <AdminRoute path='/admin/product/:id/edit' Component={ProductEditScreen} />
              <AdminRoute path='/admin/orderlist' Component={OrderListScreen} exact />
              <AdminRoute path='/admin/orderlist/:pageNumber' Component={OrderListScreen} exact />
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
              <Route path='/' component={HomeScreen} exact />
              <Route path='*' component={PageNotFound} />
            </Switch>
          </ContainerPage>
        </main>
        <Footer />
      </Router>
   
  );
}

export default App;
