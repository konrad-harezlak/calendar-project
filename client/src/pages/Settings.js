import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './settings.css';
import axios from 'axios'
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
            alert("Hasło jest wymagane!");
            setShowPasswordError(true);
            return;
        } else
            setShowPasswordError(false);
        console.log("tutaj" + userData.firstName)
        console.log(userData.firstName)
        console.log(userData.password)
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
            // Wyślij dane do serwera za pomocą axios
            const token = localStorage.getItem('token');
            let response = await axios.post('http://localhost:4000/settings', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`
            }},
         );
            login(response.data.user);
            navigate('/home');
        } catch (error) {
            console.error('Błąd podczas zapisywania danych:', error);
        }


    };
    return (
        <div className='settings_page'>
            <div className='settings_container'>
                <form encType="multipart/form-data" method='POST' onSubmit={handleSubmit} >
                    <div className='col1'>
                        <label>
                            Imię:
                            <input type='text' name='firstName' value={userData.firstName} onChange={handleChange} />
                        </label>
                        <label>
                            Nazwisko:
                            <input type='text' name='lastName' value={userData.lastName} onChange={handleChange} />
                        </label>
                        <label>
                            Stanowisko:
                            <input type='text' name='position' value={userData.position} onChange={handleChange} />
                        </label>
                        <label>
                            Stopień doświadczenia:
                            <input type='text' name='experienceLevel' value={userData.experienceLevel} onChange={handleChange} />
                        </label>
                        <label>
                            Opis stanowiska/siebie:
                            <textarea name='description' value={userData.description} onChange={handleChange}></textarea>
                        </label>
                        <label>
                            Zdjęcie:
                            <input type='file' accept='image/*' name='profilePicture' onChange={handleChange} />
                        </label>
                    </div>
                    <div className='col2'>
                        <label>
                            Nowe hasło:
                            <input type='password' name='newPassword' value={userData.newPassword} onChange={handleChange} />
                        </label>
                        <label>
                            Nowy email:
                            <input type='email' name='email' value={userData.email} onChange={handleChange} />
                        </label>
                        <label>
                            Nowy loginu:
                            <input type='text' name='userName' value={userData.userName} onChange={handleChange} />
                        </label>
                        <label>
                            Hasło:
                            <input type='password' name='password' value={userData.password} onChange={handleChange} />
                            {showPasswordError && <p className='alert_wrong'>Brak hasła! Wprowadź hasło.</p>}
                        </label>
                    </div>
                    <div className='button_container'>
                        <Link to='/home'><input type='button' value="Anuluj"></input></Link>
                        <button type='submit'>Zapisz</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default Settings;