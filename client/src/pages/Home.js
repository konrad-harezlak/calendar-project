import React from 'react';
import './home.css'
import Navigation from './Navigation';
import { useAuth } from './AuthContext';


const Home = () => {
    const { user } = useAuth();
    console.log(user.profilePicture)
    let profilePictureURL = null;
    if (user.profilePicture) {
        const blob = new Blob([new Uint8Array(user.profilePicture.data)], { type: 'image/jpeg' });
        profilePictureURL = URL.createObjectURL(blob);
    }

    return (
        <div className='home_page'>
            <Navigation />
            <div className='home_container'>
                <div className='profil'>
                    <p>Imię i nazwisko: {user.firstName ? `${user.firstName}` : '-'} {user.lastName ? `${user.lastName}` : '-'}</p>
                    <p>E-mail: {user.email}</p>
                    <p>Stanowisko: {user.position || '-'}</p>
                    <p>Stopień doświadczenia: {user.experienceLevel || '-'}</p>
                </div>
                <div className='profil_img'>
                    <img src={profilePictureURL} alt='Profilowe zdjęcie' />
                </div>
                <div className='profil_dec'>
                    {user.description || 'Brak opisu użytkownika'}
                </div>

            </div>
        </div>
    )

}
export default Home;