import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message'
import { Row, Col } from 'react-bootstrap'
import {
  Chart as ChartJS, ArcElement, CategoryScale,
  LinearScale,
  BarElement,
  Title, Tooltip, Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { listAllOrders } from '../../action/orderAction';
import styled from 'styled-components'
import { listTopProducts } from '../../action/productAction';
const TitleChart = styled.h4`
  color:black;  
`
ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title, ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        display: false
      }
    }
  },
};
const label = [
  '< 100$',
  '< 500$',
  '< 1000$',
  '< 1500$',
  '<= 2000$',
  '> 2000$'
]
const ChartScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [dataChart, setDataChart] = useState({})
  const [dataChartProduct, setDataChartProduct] = useState({})
  const allOrdersList = useSelector(state => state.allOrdersList)
  const { loading, orders, error } = allOrdersList
  const productTopRated = useSelector(state => state.productTopRated)
  const { products } = productTopRated
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    return () => {
      if(history.action === 'POP'){
        history.replace('/')
      }
    }
  },[history])

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    }
    if (userInfo && userInfo.isAdmin && orders.length === 0) {
      dispatch(listAllOrders())
    }
    if (userInfo && userInfo.isAdmin && products.length === 0) {
      dispatch(listTopProducts(8))
    }
  }, [dispatch, history, userInfo, orders])

  useEffect(() => {
    if (products.length > 0) {
      const labels = products.map(item => item.name)
      const data = {
        labels,
        datasets: [
          {
            label: 'Top rated product',
            data: products.map(item => item.rating),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ]
      }
      setDataChartProduct(data)
    }
    if (orders.length > 0) {
      let tmpData = [0, 0, 0, 0, 0, 0]
      orders.forEach(item => {
        if (item.totalPrice < 100) {
          tmpData[0]++
        } else if (item.totalPrice >= 100 && item.totalPrice < 500) {
          tmpData[1]++
        } else if (item.totalPrice >= 500 && item.totalPrice < 1000) {
          tmpData[2]++
        } else if (item.totalPrice >= 1000 && item.totalPrice < 1500) {
          tmpData[3]++
        } else if (item.totalPrice >= 1500 && item.totalPrice < 2000) {
          tmpData[4]++
        } else {
          tmpData[5]++
        }
      })
      let data = {
        labels: label,
        datasets: [
          {
            label: '# of Votes',
            data: tmpData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }
        ]
      }
      setDataChart(data)
    }
  }, [orders, products])
  return (
    <>
      {
        loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (
          <>
            <Row>
              <Col md={12}>
                <TitleChart style={{ textAlign: 'center' }}>Order quantity by price</TitleChart>
                {

                  dataChart.datasets && <Doughnut data={dataChart} style={{ maxHeight: '500px' }} />
                }
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col md={12}>
                <TitleChart style={{ textAlign: 'center' }}>Top rating products</TitleChart>
                {

                  dataChartProduct.datasets && <Bar options={options} data={dataChartProduct} />
                }
              </Col>
            </Row>
          </>
        )
      }
    </>
  );
};

export default ChartScreen;
