import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from './AuthContext';

const Login = () => {
    const {login} = useAuth();
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response =await axios.post('https://calendar-a5id.onrender.com/login',loginData,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const {token,user} = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            login(user);
            navigate('/home');
        } catch (error) {
            console.error('Błąd logowania:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Zły Login lub Hasło.'); 
            } else {
                console.error('Błąd logowania:', error);
            }
        }
    };
    return (
        <div className='login_page'>
            <div className='form'>
                <form method="POST" onSubmit={handleLogin}>
                    <label>
                        <p> Wpisz swój login: </p>
                        <input
                            type='userName'
                            placeholder='Login...'
                            name='userName'
                            value={loginData.userName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <p> Hasło: </p>
                        <input
                            type='password'
                            placeholder='Haslo...'
                            name='password'
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p className='p_link'><Link to="/registration" className='link'>Zarejestruj się!</Link></p>
                <p className='p_link'><Link to="/recovery" className='link'>Zapomniałem hasła</Link></p>
            </div>
        </div>
    )

}
export default Login;