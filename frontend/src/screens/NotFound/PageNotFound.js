import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import ButtonComponent from '../../components/Button/ButtonComponent'
const Container = styled.div`
  width:100%;
  height:100%;
  text-align:center
`
const Title = styled.h1`
  color:black;
  font-weight:bold
`
const Content = styled.h4`
  color:black
`
const PageNotFound = () => {
  const history = useHistory()
  return (
    <Container>
      <Title>404 Oops</Title>
      <Content>Page Not Found</Content>
      <ButtonComponent onClick={() => history.replace('/')}>Back to home</ButtonComponent>
    </Container>
  )
}

export default PageNotFound