import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';


class Navigation extends React.Component {
    render() {
        return (
            <nav className='navigation'>
                <div className='nav_container'>  
                    <ul>
                        <Link to="/home" className='nav_link'><li>Profil</li></Link><Link to="/calendar" className='nav_link'><li>Kalendarz</li></Link><Link to="/messages" className='nav_link'><li>Wiadomości</li></Link>
                    </ul>
                </div>
                <div className='settings'>
                    <Link to='/settings'><FontAwesomeIcon icon={faGear} className='font_icon' /></Link>
                </div>
            </nav>
        )
    }
}
export default Navigation;
