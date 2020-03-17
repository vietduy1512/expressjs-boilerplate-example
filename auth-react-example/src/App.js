import React from 'react';
import AuthContainer from './layout/AuthContainer';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store} className="container-fluid p-0">
      <AuthContainer />
    </Provider>
  );
}

export default App;
