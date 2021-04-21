import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import s from './App.module.css';
import Auth from './components/Auth/Auth';
import MainPage from './components/MainPage/MainPage';

Object.defineProperty(Object.prototype, 'valid', {
  value: function () {
    let count = 0
    for (let item in this) {
      if (this[item] !== '') {
        count++
      }
    }
    return count
  },
  enumerable: false,
  writable: false,
  configurable: false
})

function App() {
  const initializedUser = useSelector(state => state.profile.intialized)
  return (
    <div className={s.wrapper}>
      {!initializedUser ? <Redirect to="/auth" /> : <Redirect to="/profile" />}
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
