import React, { useState, useRef, useEffect } from 'react'
import Message from '../Message/Message'
import styles from './chatbot.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getEventWelcomeAction, getTextQueryAction } from '../../action/chatBotAction'
import { GET_TEXT_QUERY_RESET } from '../../constants/chatBotConstant'
import { v4 as uuidv4 } from 'uuid'

const Chatbot = ({ closeMessage }) => {
    if (!localStorage.getItem('UserId')) {
        localStorage.setItem('UserId', uuidv4())
    }
    const dispatch = useDispatch()
    const getEventWelcome = useSelector(state => state.getEventWelcome)
    const { loading: loadingEventWelcome, eventWelcome, error } = getEventWelcome

    const getTextQuery = useSelector(state => state.getTextQuery)
    const { loading, textQuery, error: errorTextQuery } = getTextQuery

    const messRef = useRef(null)
    const [mess, setMess] = useState('')
    const [listMsg, setListMsg] = useState([])

    const handleChange = (e) => {
        setMess(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (mess === '') {
                return
            }
            setListMsg(prevState => [...prevState, {
                'target': 'user',
                'message': mess
            }])
            setMess('')
            dispatch(getTextQueryAction({ mess, IdUser: localStorage.getItem('UserId') }))
        }
    }

    const handleClickQuickReply = (payload, text) => {
        switch (payload) {
            case 'recommend_yes':
                dispatch(getEventWelcomeAction({ eventName: 'SHOW_RECOMMENDATIONS', IdUser: localStorage.getItem('UserId') }))
                break;
            case 'sport_onsale':
                dispatch(getEventWelcomeAction({ eventName: 'ON_SALE_PRODUCT', IdUser: localStorage.getItem('UserId') }))
                break;
            default:
                dispatch(getTextQueryAction({ mess: text, IdUser: localStorage.getItem('UserId') }))
                break;
        }
        const tmpListMsg = [...listMsg].filter(item => item.target !== 'bot-quickreply')
        setListMsg(tmpListMsg)
    }

    const renderMessageBot = (srcDialog) => {
        srcDialog.result.fulfillmentMessages.forEach(item => {
            let message
            if (item && item.payload && item.payload.fields && item.payload.fields.idProduct) {
                message = {
                    target: 'bot-showlink',
                    message: item.payload.fields
                }
                setListMsg(prevState => [...prevState, message])
            } else if (item && item.payload && item.payload.fields && item.payload.fields.text) {
                message = {
                    target: 'bot-quickreply',
                    message: item.payload.fields
                }
                setListMsg(prevState => [...prevState, message])
            } else if (item && item.text && item.text.text) {
                message = {
                    target: 'bot',
                    message: item.text.text
                }
                setListMsg(prevState => [...prevState, message])
            } else {
                message = {
                    target: 'bot-recommend',
                    message: item.payload.fields.cards.listValue.values
                }
                setListMsg(prevState => [...prevState, message])
            }
        })
    }

    useEffect(() => {
        if (textQuery && textQuery.result) {
            renderMessageBot(textQuery)
        }
    }, [dispatch, textQuery])


    useEffect(() => {

        if (!eventWelcome.result) {
            dispatch(getEventWelcomeAction({ eventName: 'WELCOME_TO_SHOP', IdUser: localStorage.getItem('UserId') }))
        } else {
            renderMessageBot(eventWelcome)
        }
        return () => {
            dispatch({ type: GET_TEXT_QUERY_RESET })
        }
    }, [dispatch, eventWelcome])

    useEffect(() => {
        messRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [listMsg])

    return (
        <div className={styles.container}>
            <div className={styles.chatbot_title}>
                <i className="far fa-times-circle" onClick={closeMessage}></i>
            </div>
            <div className={styles.chatbot_content}>
                {listMsg.map((msg, index) => (
                    <Message key={index} target={msg.target} message={msg.message} loading={loading} handleClickQuickReply={handleClickQuickReply} />
                ))}
                <div ref={messRef}>
                </div>
            </div>
            <div className={styles.chatbot_input}>
                <input value={mess} onKeyPress={handleEnter} onChange={handleChange} placeholder='type message here' />
            </div>
        </div >
    )
}

export default Chatbot
