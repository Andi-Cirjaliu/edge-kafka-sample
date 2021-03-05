import React from 'react';
import './App.css';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import AppState from '../context/AppState';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import ListMessages from './ListMessages';
import SendMessage from './SendMessage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <AppState>
      <BrowserRouter>
        <div style={{ margin: "50px" }}>
          <NavBar />
          <ErrorMessage />
          <Switch>
            <Route
              exact
              path="/messages"
              render={(routeParams) => <ListMessages {...routeParams} />}
            ></Route>
            <Route
              exact
              path="/send"
              render={(routeParams) => <SendMessage {...routeParams} />}
            ></Route>
            <Redirect to="/messages" />
          </Switch>
        </div>
      </BrowserRouter>
    </AppState>
  );
}

export default App;
