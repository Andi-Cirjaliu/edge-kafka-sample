import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';

import dotenv from 'dotenv';

import './index.css';

dotenv.config();
// console.log('Process Env: ', process.env);
console.log('Server: ', process.env.REACT_APP_SERVER_URL);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
