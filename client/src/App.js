
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Recovery from './pages/recovery';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Error404 from './pages/Error404';
import Pomodoro from './pages/Pomodoro';
import { useAuth } from './pages/AuthContext';

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"></link>
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path='/' exact element={user ? <Home /> : <Login />} />
            <Route path='/registration' element={user ? <Home /> : <Registration />} />
            <Route path='/recovery' element={user ? <Home /> : <Recovery />} />
            <Route path='/home' element={user ? <Home /> : <Login />} />
            <Route path='/messages' element={user ? <Messages /> : <Login />} />
            <Route path='/calendar' element={user ? <Calendar /> : <Login />} />
            <Route path='/settings' element={user ? <Settings /> : <Login />} />
            <Route path='/pomodoro' element={user ? <Pomodoro /> : <Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
