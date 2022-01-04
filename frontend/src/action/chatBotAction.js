import { GET_EVENT_WELCOME_FAIL, GET_EVENT_WELCOME_REQUEST, GET_EVENT_WELCOME_SUCCESS, GET_TEXT_QUERY_FAIL, GET_TEXT_QUERY_REQUEST, GET_TEXT_QUERY_SUCCESS } from '../constants/chatBotConstant'
import axios from 'axios'
export const getEventWelcomeAction = (eventWelcome) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EVENT_WELCOME_REQUEST
        })

        const { data } = await axios.post('/api/chatbot/df_event_query', { event: eventWelcome })

        dispatch({
            type: GET_EVENT_WELCOME_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_EVENT_WELCOME_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const getTextQueryAction = (txtQuery) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TEXT_QUERY_REQUEST
        })

        const { data } = await axios.post('/api/chatbot/df_text_query', { text: txtQuery })

        dispatch({
            type: GET_TEXT_QUERY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_TEXT_QUERY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}