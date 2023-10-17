import React from 'react';
import './home.css'
import Navigation from './Navigation';

const Home=()=>{
    return(
        <div className='home_page'>
                <Navigation/>
                <div className='home_container'>
                    <div className='profil'>
                        <p>Imie i nazwisko</p>
                        <p>E-mail</p>
                        <p>Stanowisko</p>
                        <p>Stopień doświadczenia</p>
                    </div>
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