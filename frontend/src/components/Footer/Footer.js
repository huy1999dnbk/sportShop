import React from 'react'
import { Container, Col, Row, Nav } from 'react-bootstrap'
import styles from './footer.module.css'
const Footer = () => {
  return (
    <footer style={{ background: '#232F3E', color: 'white', marginTop: '50px' }}>
      <Container>
        <Row>
          <Col className={`py-3 ${styles.connect}`} md={4}>
            <Nav.Link eventKey="disabled" disabled>
              <h5> Connect with us</h5>
            </Nav.Link>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-instagram-square"></i>
            <i className="fab fa-twitter-square"></i>
            <i className="fab fa-pinterest-square"></i>
          </Col>
          <Col className={`py-3 ${styles.info}`} md={4}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled>
                <h5>Information</h5>
              </Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link disabled href="/">My account</Nav.Link>
              <Nav.Link href="/">Policy</Nav.Link>
            </Nav>
          </Col>
          <Col className={`py-3 ${styles.contact}`} md={4}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled>
                <h5> Contact with us</h5>
              </Nav.Link>
              <Nav.Link href="/">
                <i className="fas fa-map-marker-alt"></i>
                <span>44 Tran Van Ky, Hoa Khanh Nam, Lien Chieu, Da Nang</span>
              </Nav.Link>
              <Nav.Link href="/">
                <i className="fas fa-phone"></i>
                <span>0931858287</span>
              </Nav.Link>
              <Nav.Link href="/">
                <i className="fas fa-envelope"></i>
                <span>huy1999dnbk@gmail.com</span>
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
