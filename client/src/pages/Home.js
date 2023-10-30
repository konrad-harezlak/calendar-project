import React from 'react';
import './home.css';
import Navigation from './Navigation';
import { useAuth } from './AuthContext';

const Home = () => {
    const { user } = useAuth();
    let profilePictureURL = null;
    if (user.profilePicture) {
        const blob = new Blob([new Uint8Array(user.profilePicture.data)], { type: 'image/jpeg' });
        profilePictureURL = URL.createObjectURL(blob);
    }

    return (
        <div className='home_page'>
            <Navigation />
            <div className='home_container'>
                <div className='profile_info'>
                    <h1>Witaj, {user.firstName || user.userName}!</h1>
                    <p>Email: {user.email}</p>
                    <p>Stanowisko: {user.position || '-'}</p>
                    <p>Stopień doświadczenia: {user.experienceLevel || '-'}</p>
                </div>
                <div className='profile_image'>
                    <img src={profilePictureURL} alt='Profilowe zdjęcie' />
                </div>
                <div className='profile_description'>
                    <h2>O mnie:</h2>
                    <p>{user.description || 'Brak opisu użytkownika'}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
