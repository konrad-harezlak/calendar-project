import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';


const Navigation = ()=>{
        const { logout } = useAuth();
        return (
            <nav className='navigation'>
                <div className='nav_container'>
                    <ul>
                        <Link to="/home" className='nav_link'><li>Profile</li></Link>
                        <Link to="/calendar" className='nav_link'><li>Calendar</li></Link>
                        <Link to="/messages" className='nav_link'><li>Messages</li></Link>
                        <Link to="/pomodoro" className='nav_link'><li>Pomodoro</li></Link>
                        <Link to="/todo" className='nav_link'><li>ToDo</li></Link>
                    </ul>
                </div>
                <div className='settings_button'>
                    <button onClick={logout}>
                        <FontAwesomeIcon icon={faSignOut} className='font_icon'  />
                    </button>
                    <Link to='/settings' >
                        <FontAwesomeIcon icon={faGear} size='3x' className='font_icon' />
                    </Link>
                </div>
            </nav>
        )
    }
export default Navigation;
