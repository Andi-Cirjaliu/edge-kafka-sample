import React, { useReducer } from 'react';
import axios from 'axios';

import {GET_MESSAGES, SEND_MESSAGE, CLEAR_MESSAGES, SET_ERROR, CLEAR_ERROR, SET_LOADING, SET_OPERATION} from './types';
import appReducer from './AppReducer';
import AppContext from './AppContext';

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV: 'development';
console.log('NODE_ENV: ', NODE_ENV);

const {REACT_APP_SERVER_URL} = process.env;
const {SERVER_URL} = window;
console.log('REACT_APP_SERVER_URL: ', REACT_APP_SERVER_URL);
console.log('SERVER_URL: ', SERVER_URL);

const BACKEND_URL = NODE_ENV === 'development' ? REACT_APP_SERVER_URL : SERVER_URL;
console.log('Backend URL: ', BACKEND_URL);

const AppState = (props) => {
  const INITIAL_STATE = {
    messages: [],
    loading: false,
    error: null,
    operation: '/messages'
  };

  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const getMessages = async () => {
    console.log("Get messages..");

    setLoading();

    try {
        console.log(`Get messages from ${BACKEND_URL}`);
        const resp = await axios.get(`${BACKEND_URL}`, {});
        const data = resp.data;
        console.log(data);

        dispatch({type: GET_MESSAGES, payload: data});
    } catch(error) {
        console.error(error);
        console.error(error.response);
        setError(error.response ? error.response.data.msg : error.message);
    }
  };

  const sendMessage = async (message) => {
    console.log("Send message ", message);

    setLoading();

    try {
        console.log(`Send message to ${BACKEND_URL}`);
        const resp = await axios.post(`${BACKEND_URL}`, message, {
          headers: { "Content-Type": "application/json" },
        });
        const data = resp.data;
        console.log(data);

        dispatch({type: SEND_MESSAGE, payload: data});
    } catch(error) {
        console.error(error);
        console.error(error.response);
        setError(error.response ? error.response.data.msg : error.message);
    }
  };

  const clearMessages = async () => {
    console.log("Clear messages... ");

    setLoading();

    try {

        const resp = await axios.delete(`${BACKEND_URL}`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = resp.data;
        console.log(data);

        dispatch({type: CLEAR_MESSAGES, payload: data});
    } catch(error) {
        console.error(error);
        console.error(error.response);
        setError(error.response ? error.response.data.msg : error.message);
    }
  };

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error});

    setTimeout( () => clearError(), 5000);
  }

  const clearError = () => {
      dispatch({type: CLEAR_ERROR});
  }

  const setLoading = () => {
      dispatch({type: SET_LOADING});
  }

  const setOperation = (operation) => {
    dispatch({type: SET_OPERATION, payload: operation});
  }

  return (
    <AppContext.Provider
      value={{
        messages: state.messages,
        loading: state.loading,
        error: state.error,
        operation: state.operation,
        getMessages,
        sendMessage,
        clearMessages,
        setOperation,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
