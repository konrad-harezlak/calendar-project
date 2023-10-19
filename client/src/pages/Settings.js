import React, { useState } from 'react';
import './settings.css';

const Settings = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        experienceLevel: '',
        description: '',
        profilePicture: '',
        password: '',
        email: '',
        newUsername: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value.trim() === '') {
            return;
          }
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Wysyłanie danych do serwera lub przetwarzanie ich w inny sposób
        console.log('Dane użytkownika:', userData);
    };
    return (
        <div className='settings_page'>
            <div className='settings_container'>
                <form>
                    <div className='col1'>
                        <label>
                            Imię i nazwisko:
                            <input type='text' name='firstName' value={userData.firstName} onChange={handleChange} />
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
                            <input type='file' name='profilePicture' onChange={handleChange} />
                        </label>
                    </div>
                    <div className='col2'>
                        <label>
                            Zmiana hasła:
                            <input type='password' name='password' value={userData.password} onChange={handleChange} />
                        </label>
                        <label>
                            Zmiana email:
                            <input type='email' name='email' value={userData.email} onChange={handleChange} />
                        </label>
                        <label>
                            Zmiana loginu:
                            <input type='text' name='newUsername' value={userData.newUsername} onChange={handleChange} />
                        </label>
                    </div>
                    <div className='button_container'>
                        <input type='button' value="Anuluj"></input>
                        <button type='submit' onClick={handleSubmit}>Zapisz</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default Settings;