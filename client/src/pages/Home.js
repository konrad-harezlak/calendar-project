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
                    <h1>Welcome, {user.firstName || user.userName}!</h1>
                    <p>Email: {user.email}</p>
                    <p>Position: {user.position || '-'}</p>
                    <p>Experience Level: {user.experienceLevel || '-'}</p>
                </div>
                <div className='profile_image'>
                    <img src={profilePictureURL} alt='Profile Picture' />
                </div>
                <div className='profile_description'>
                    <h2>About Me:</h2>
                    <p>{user.description || 'No user description available'}</p>
                </div>
            </div>
        </div>

    );
}

export default Home;
