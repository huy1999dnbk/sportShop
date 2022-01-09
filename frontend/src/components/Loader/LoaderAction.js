import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import styles from './loaderaction.module.css'
const BackDropOverLay = styled.div`
    z-index:50;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background: rgba(0,0,0,0.7)
`

const BackDrop = () => (
  <BackDropOverLay />
)

const ModalOverlay = () => (
  <div className={styles.loaderContainer}>
    <div className={styles[`lds-spinner`]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>

)


const LoaderAction = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById('backdrop-loader-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById('overlay-loader-root')
      )}

    </>
  )
}

export default LoaderAction
