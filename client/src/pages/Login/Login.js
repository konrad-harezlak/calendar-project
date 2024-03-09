import React, { useState } from 'react';
import axios from '../../api.js';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from '../AuthContext.js';

const Login = () => {
    const { login } = useAuth();
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
            const response = await axios.post('/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            login(user);
            navigate('/home');
        } catch (error) {
            console.error('Login error: ', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Incorrect username or password.');
            } else {
                console.error('Login error: ', error);
            }
        }
    };
    return (
        <div className='login_page'>
            <div className='form'>
                <form method="POST" onSubmit={handleLogin}>
                    <label>
                        <p> Enter your username: </p>
                        <input
                            type='text'
                            placeholder='Username...'
                            name='userName'
                            value={loginData.userName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <p> Password: </p>
                        <input
                            type='password'
                            placeholder='Password...'
                            name='password'
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p className='p_link'><Link to="/registration" className='link'>Register!</Link></p>
                <p className='p_link'><Link to="/recovery" className='link'>Forgot password?</Link></p>
            </div>
        </div>
    )

}
export default Login;