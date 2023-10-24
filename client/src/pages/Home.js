import React from 'react';
import './home.css'
import Navigation from './Navigation';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';


const Home = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    }
    return (
        <div className='home_page'>
            <Navigation />
            <div className='home_container'>
                {user ? (
                    <div className='profil'>
                        <p>Imie i nazwisko</p>
                        <p>E-mail</p>
                        <p>Stanowisko</p>
                        <p>Stopień doświadczenia</p>
                    </div>
                ) : (
                    <p>Nie jesteś zalogowany. Zaloguj się, aby zobaczyć swoje dane.</p>
                )}
                <div className='profil_img'>

                </div>
                <div className='profil_dec'>
                    lorem5 lorem5
                </div>

            </div>
        </div>
    )

}
export default Home;