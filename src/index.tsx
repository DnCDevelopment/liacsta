import ReactDOM from 'react-dom';
import React from 'react';

import firebase from 'firebase/app';

import App from './components/App';

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

ReactDOM.render(<App />, document.querySelector('#container'));

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
