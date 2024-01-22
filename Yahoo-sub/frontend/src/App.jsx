import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Repass from './components/Repass';

const App = () => {
  const [user, setUser] = useState(false);

  React.useEffect(() => {
    const session = localStorage.getItem('token');
    if (session) {
      setUser(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            {user ? <Home /> : <Login />}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/repass'>
            <Repass />
          </Route>
          <Route path='*'>Error Page</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
