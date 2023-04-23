import React, { Fragment, useContext} from 'react';
//edited here
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auto-context';



function App() {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      <MainHeader />
      <main>
        {/* we will not use the useContext in login and home because we are directly using it there 
        and not just sending it to some other file */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </Fragment>
      

  );
}

export default App;
