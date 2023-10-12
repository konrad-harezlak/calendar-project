import React from 'react';
import { Link } from 'react-router-dom';
import './registration.css';

const Registration = () => {
    return (
        <div className='registration_page'>
            <div className='form'>
                <form method='POST'>
                    <label>
                        <p> Podaj Login: </p>
                        <input type='text' placeholder='Login...'/>
                    </label>
                    <label>
                        <p> Podaj Email: </p>
                        <input type='email' placeholder='Email...' />
                    </label>
                    <label>
                        <p> Hasło: </p>
                        <input type='password' placeholder='Hasło...'/>
                    </label>
                    <label>
                        <p> Powtórz Hasło: </p>
                        <input type='password'  placeholder='Powtórz hasło...'/>
                    </label>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                <p className='p_link'><Link to="/" className='link'>Zaloguj się!</Link></p>
                <p className='p_link'><Link to="/recovery" className='link'>Zapomniałem hasła</Link></p>
            </div>
        </div>
    )

}
export default Registration;