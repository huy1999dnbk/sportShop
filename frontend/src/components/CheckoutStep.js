import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Stepper, Step } from 'react-form-stepper';

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <>

      <Stepper stepClassName='p-3' >
        {step1 ? (
          <LinkContainer to='/login'>
            <Step children={<i className="fas fa-sign-in-alt"></i>} completed={step2} active={step1} label="Sign In" />
          </LinkContainer>
        ) : (
          <Step children={<i className="fas fa-sign-in-alt"></i>} disabled={true} label="Sign In" />
        )}
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Step children={<i className="fas fa-shipping-fast"></i>} completed={step3} active={step2} label="Shipping" />
          </LinkContainer>
        ) : (
          <Step children={<i className="fas fa-shipping-fast"></i>} disabled={true} label="Shipping" />
        )}
        {step3 ? (
          <LinkContainer to='/payment'>
            <Step children={<i className="far fa-money-bill-alt"></i>} completed={step4} active={step3} label="Payment" />
          </LinkContainer>
        ) : (
          <Step children={<i className="far fa-money-bill-alt"></i>} disabled={true} label="Payment" />
        )}
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Step children={<i className="fas fa-shopping-cart"></i>} active={step4} label="Place Order" />
          </LinkContainer>
        ) : (
          <Step children={<i className="fas fa-shopping-cart"></i>} disabled={true} label="Place Order" />
        )}

      </Stepper>  
    </>

  )
}

export default CheckoutStep
