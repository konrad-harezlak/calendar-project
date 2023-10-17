import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Recovery from './pages/recovery';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"></link>
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/recovery' element={<Recovery/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/messages' element={<Messages/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='*' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
