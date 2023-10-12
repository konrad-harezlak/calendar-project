import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    return (
        <div className='login_page'>
            <div className='form'>
                <form method='POST' action='/home'>
                    <label>
                        <p> Wpisz swój login: </p>
                        <input type='login' placeholder='Login...'/>
                    </label>
                    <label>
                        <p> Hasło: </p>
                        <input type='password' placeholder='Haslo...'/>
                    </label>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                <p className='p_link'><Link to="/registration" className='link'>Zarejestruj się!</Link></p>
                <p className='p_link'><Link to="/recovery" className='link'>Zapomniałem hasła</Link></p>
            </div>
        </div>
    )

}
export default Login;