import { GET_EVENT_WELCOME_FAIL, GET_EVENT_WELCOME_REQUEST, GET_EVENT_WELCOME_SUCCESS, GET_TEXT_QUERY_FAIL, GET_TEXT_QUERY_REQUEST, GET_TEXT_QUERY_SUCCESS, GET_TEXT_QUERY_RESET } from '../constants/chatBotConstant'

export const getEventWelcomeReducer = (state = { eventWelcome: {} }, action) => {
    switch (action.type) {
        case GET_EVENT_WELCOME_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_EVENT_WELCOME_SUCCESS:
            return {
                loading: false,
                eventWelcome: action.payload
            }
        case GET_EVENT_WELCOME_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        default:
            return { ...state }
    }
}
export const getTextQueryReducer = (state = { textQuery: {} }, action) => {
    switch (action.type) {
        case GET_TEXT_QUERY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_TEXT_QUERY_SUCCESS:
            return {
                loading: false,
                textQuery: action.payload
            }
        case GET_TEXT_QUERY_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        case GET_TEXT_QUERY_RESET:
            return {
                textQuery: {}
            }
        default:
            return { ...state }
    }
}

