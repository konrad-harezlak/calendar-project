import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './settings.css';
import axios from '../api.js'
import { useAuth } from './AuthContext'

const Settings = () => {
    let [showPasswordError, setShowPasswordError] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        experienceLevel: '',
        description: '',
        profilePicture: '',
        newPassword: '',
        email: '',
        userName: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture" && files && files.length > 0) {
            const selectedFile = files[0];
            setUserData((prevData) => ({
                ...prevData,
                profilePicture: selectedFile,
            }));
        } else {
            setUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.password) {
            alert("Password is required!");
            setShowPasswordError(true);
            return;
        } else
            setShowPasswordError(false);
        const formData = new FormData();
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append("position", userData.position);
        formData.append("experienceLevel", userData.experienceLevel);
        formData.append("description", userData.description);
        formData.append("profilePicture", userData.profilePicture);
        formData.append("newPassword", userData.newPassword);
        formData.append("email", userData.email);
        formData.append("userName", userData.userName);
        formData.append("password", userData.password);
        try {
            const token = localStorage.getItem('token');
            let response = await axios.post('/settings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`
                }
            },
            );
            login(response.data.user);
            navigate('/home');
        } catch (error) {
            console.error('Error occured saving data: ', error);
        }


    };
    return (
        <div className='settings_page'>
            <div className='settings_container'>
                <form encType="multipart/form-data" method='POST' onSubmit={handleSubmit}>
                    <div className='col1'>
                        <label>
                            First Name:
                            <input type='text' name='firstName' value={userData.firstName} onChange={handleChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type='text' name='lastName' value={userData.lastName} onChange={handleChange} />
                        </label>
                        <label>
                            Position:
                            <input type='text' name='position' value={userData.position} onChange={handleChange} />
                        </label>
                        <label>
                            Experience Level:
                            <input type='text' name='experienceLevel' value={userData.experienceLevel} onChange={handleChange} />
                        </label>
                        <label>
                            Job/Self Description:
                            <textarea name='description' value={userData.description} onChange={handleChange}></textarea>
                        </label>
                        <label>
                            Photo:
                            <input type='file' accept='image/*' name='profilePicture' onChange={handleChange} />
                        </label>
                    </div>
                    <div className='col2'>
                        <label>
                            New Password:
                            <input type='password' name='newPassword' value={userData.newPassword} onChange={handleChange} />
                        </label>
                        <label>
                            New Email:
                            <input type='email' name='email' value={userData.email} onChange={handleChange} />
                        </label>
                        <label>
                            New Username:
                            <input type='text' name='userName' value={userData.userName} onChange={handleChange} />
                        </label>
                        <label>
                            Password:
                            <input type='password' name='password' value={userData.password} onChange={handleChange} />
                            {showPasswordError && <p className='alert_wrong'>No password! Enter a password.</p>}
                        </label>
                    </div>
                    <div className='button_container'>
                        <Link to='/home'><input type='button' value="Cancel"></input></Link>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Settings;