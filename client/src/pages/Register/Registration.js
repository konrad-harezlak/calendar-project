import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registration.css';
import axios from '../../api.js'

const Registration = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        email: '',
        password: '',
        password2: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        let alert = document.getElementById('alert');
        alert.innerHTML = '';
        e.preventDefault();
        if (userData.password !== userData.password2) {
            alert.innerHTML += 'Passwords do not match!';
            return;
        } else
            alert.innerHTML = '';
        try {
            await axios.post('/registration', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return navigate("/");
        } catch (error) {
            console.error(error, '\n', error.response);
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'User with this username already exists.') {
                    alert.innerHTML += 'User with this username already exists.';
                } else if (error.response.data.message === 'User with this email already exists.') {
                    alert.innerHTML += 'User with this email already exists.';
                } else {
                    alert.innerHTML += 'An error occurred during registration.';
                }
            }

        }

    }



    return (
        <div className='registration_page'>
            <div className='form'>
                <form method='POST' onSubmit={handleSubmit}>
                    <label>
                        <p>Enter Username:</p>
                        <input type='text' placeholder='Username...' onChange={handleInputChange} name='userName' value={userData.userName} />
                    </label>
                    <label>
                        <p>Enter Email:</p>
                        <input type='email' placeholder='Email...' onChange={handleInputChange} name='email' value={userData.email} />
                    </label>
                    <label>
                        <p>Password:</p>
                        <input type='password' placeholder='Password...' onChange={handleInputChange} name='password' value={userData.password} />
                    </label>
                    <label>
                        <p>Repeat Password:</p>
                        <input type='password' placeholder='Repeat password...' onChange={handleInputChange} name='password2' value={userData.password2} />
                    </label>
                    <p id='alert' className='alert_wrong'></p>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                <p className='p_link'><Link to="/" className='link'>Log in!</Link></p>
                <p className='p_link'><Link to="/recovery" className='link'>Forgot password</Link></p>
            </div>
        </div>

    )

}
export default Registration;