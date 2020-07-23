import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';

import Additions from './components/Additions/Additions';
import App from './components/App';
import Dishes from './components/Dishes/Dishes';

import './index.scss';
import 'antd/dist/antd.css';

firebase.initializeApp({
  apiKey: 'AIzaSyDsyBlCA8uZUf3JuCrdj3qC-spedfIyf8w',
  authDomain: 'liacsta-booking.firebaseapp.com',
  databaseURL: 'https://liacsta-booking.firebaseio.com',
  projectId: 'liacsta-booking',
  storageBucket: 'liacsta-booking.appspot.com',
  messagingSenderId: '105873817009',
  appId: '1:105873817009:web:60171b053ac119136a5190',
});

ReactDOM.render(
  <BrowserRouter>
  <App>
    <Switch>
      <Route path='/' exact component={Additions} />
      <Route path='/dishes' exact component={Dishes} />
    </Switch>
  </App>
</BrowserRouter>, document.querySelector('#root'));
