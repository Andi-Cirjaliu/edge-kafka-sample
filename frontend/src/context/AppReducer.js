import {GET_MESSAGES, SEND_MESSAGE, CLEAR_MESSAGES, SET_ERROR, CLEAR_ERROR, SET_LOADING, SET_OPERATION} from './types';

const AppReducer = (state, action) => {
    console.log('state: ', state, ', action: ', action);
    
    switch ( action.type ) {
        case GET_MESSAGES: 
            return {...state, messages: action.payload, loading: false };
        case SEND_MESSAGE:
            return { ...state, loading: false };
        case CLEAR_MESSAGES:
            return {...state, messages: action.payload, loading: false };
        case SET_ERROR:
            return {...state, loading: false, error: action.payload};
        case CLEAR_ERROR:
            return {...state, error: null};
        case SET_LOADING:
            return {...state, loading: true};
        case SET_OPERATION:
            return {...state, operation: action.payload};
        default:
            return state;
    }
}

export default AppReducer;