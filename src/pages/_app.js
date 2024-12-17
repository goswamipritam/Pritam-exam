import React from 'react';
import { Provider } from 'react-redux';
import  store  from '../redux/store';
import Footer from '../Components/footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Footer /> 
    </Provider>
  );
}