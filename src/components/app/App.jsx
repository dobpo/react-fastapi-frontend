import React, {useEffect, useState} from 'react';
import LeftMenu from '../left-menu/LeftMenu';
import Auth from '../auth/Auth';

import styles from './App.module.scss';

import {ProSidebarProvider} from 'react-pro-sidebar';
import {setAuth} from '../../actions/index';
import {connect, Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import reducers from '../../reducers/index';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.reduxStore = store;

const AuthCheck = ({auth, setAuth, children}) => {
  useEffect(() => {
    fetch('/api/users/me')
      .then(res => res.json())
      .then(res => {
        setAuth(res?.id ? {auth: true, isSuperuser: res.isSuperuser} : null);
      })
  }, []);
  if(!auth) {
    return <Auth setAuth={setAuth} />
  }
  return children;
}

const mapState = ({auth}) => ({auth});
const mapDispatch = (dispatch) => ({
  setAuth: data => dispatch(setAuth(data)),
});

const AuthCheckContainer = connect(mapState, mapDispatch)(AuthCheck);

function App() {
  const [msg, setMsg] = useState('ТЕСТ');

  // const getWelcomeMsg = async () => {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //
  //   const response = await fetch('/api', requestOptions);
  //   const data = await response.json();
  //
  //   if (!response.ok) {
  //     console.log("Something went wrong")
  //   } else {
  //     setMsg(data.message);
  //   }
  // }

  // useEffect(() => {
  //   getWelcomeMsg();
  // }, [])

  return (
    <Provider store={store}>
      <AuthCheckContainer>
        <ProSidebarProvider>
          <div className={styles.App}>
            <div style={{ display: 'flex', height: '100%'}}>
              <LeftMenu />
              <main style={{ width: '100%', border: '1px solid red'}}>
                {msg}
              </main>
            </div>
          </div>
        </ProSidebarProvider>
      </AuthCheckContainer>
    </Provider>
  );
}

export default App;
