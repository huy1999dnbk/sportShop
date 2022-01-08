import React from 'react'
import styled from 'styled-components'
import ButtonComponent from '../Button/ButtonComponent'
import ReactDOM from 'react-dom'
const BackDropOverLay = styled.div`
    z-index:50;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background: rgba(0,0,0,0.8)
`


const Card = styled.div`
  z-index:100;
  position:fixed;
  left: 50%;
  transform: translate(-50%, 0);
  top:30vh;
  background:white;
  width:50%;
  padding:12px;
  overflow:hidden;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(255,255,255,0.37); 
  box-shadow: 5px 5px 15px 5px rgba(255,255,255,0.37);
  border-radius:10px
`

const CardTitle = styled.p`
    font-size:18px;
    font-weight:bold;
    color:red
`

const CardContent = styled.p`
    font-size: 16px
    font-weight: normal;
`

const CardAction = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center
`

const BackDrop = ({onCancel}) => (
    <BackDropOverLay onClick={onCancel} />
)

const ModalOverlay = ({title,content,titleButton,onConfirm,onCancel}) => (
    <Card >
        <CardTitle>
            {title}
        </CardTitle>
        <CardContent>
            {content}
        </CardContent>
        <CardAction>
            <ButtonComponent style={{marginRight:'16px'}} customPad="8px" onClick={onCancel}>
                Cancel
            </ButtonComponent>
            <ButtonComponent  customPad="8px" onClick={onConfirm}>
                {titleButton}
            </ButtonComponent>
        </CardAction>
    </Card>
)


const Modal = ({title,content,titleButton='Save changes',onConfirm,onCancel}) => {
    return (
        <>
         {ReactDOM.createPortal(
             <BackDrop onCancel={onCancel} />,
             document.getElementById('backdrop-root')
         )} 
         {ReactDOM.createPortal(
             <ModalOverlay title={title} content={content} onConfirm={onConfirm} titleButton={titleButton} onCancel={onCancel} />,
             document.getElementById('overlay-root')
         )} 

        </>
    )
}

export default Modal
