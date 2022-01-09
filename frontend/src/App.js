import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen'
import { Container } from 'react-bootstrap'
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
import Chatbot from './components/Chatbot/Chatbot'
import DashboardAdmin from './screens/DashboardAdmin/DashboardAdmin'
import AdminRoute from './routes/AdminRoute/AdminRoute'
function App() {
  const [openMess, setOpenMess] = useState(false)

  const openMessage = () => {
    setOpenMess(true)
  }

  const closeMessage = () => {
    setOpenMess(false)
  }

  return (
    <Router>
      <Header />
      <main>
        <Container>
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
            <AdminRoute path='/admin/userlist' Component={UserListScreen} />
            <AdminRoute path='/admin/userlist' Component={UserListScreen} />
            <AdminRoute path='/admin/user/:id/edit' Component={UserEditScreen} />
            <AdminRoute path='/admin/productlist' Component={ProductListScreen} exact />
            <AdminRoute path='/admin/productlist/:pageNumber' Component={ProductListScreen} exact />
            <AdminRoute path='/admin/product/:id/edit' Component={ProductEditScreen} />
            <AdminRoute path='/admin/orderlist' Component={OrderListScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/' component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      {openMess && <div className='container-chatbot'>
        <Chatbot closeMessage={closeMessage} />
      </div>}
      <div className='container-chatbot-mini' onClick={openMessage}>
        <span>Messenger</span>
      </div>
      <Footer />

    </Router>
  );
}

export default App;
