import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './recovery.css';

const Recovery = () => {

    let recoverMail = () => {
        let form = document.getElementById('form')
        if (form)
            form.innerHTML =
                `<form>
                        <label>
                            <p>Wysłaliśmy Ci kod na email:</p>
                            <input type='text' placeholder='Kod...' />
                        </label>
                        <br />
                        <button type='submit' class='button_login' >Send!</button>
                    </form>
                    <p class='p_link'><a href="/" class='link'>Zaloguj się!</a></p>
                    <p class='p_link'><a href="/registration" class='link'>Zarejestruj się!</a></p>
     
            `;
    }


    useEffect(() => {
        let btn = document.getElementById('btn');
        btn.addEventListener("click", recoverMail);

        return () => btn.removeEventListener("click", recoverMail)
            ;
    }, [])


    return (
        <div className='recovery_page'>
            <div className='form' id='form'>
                <form >
                    <label>
                        <p> Zapomniałeś hasła?</p>
                        <input type='email' placeholder='Podaj nam swój E-mail...' />
                    </label>
                    <br />
                    <button id="btn" className='button_login' type='button'>Send!</button>
                </form>
                <p className='p_link'><Link to="/" className='link'>Zaloguj się!</Link></p>
                <p className='p_link'><Link to="/registration" className='link'>Zarejestruj się!</Link></p>
            </div>
        </div>
    )

}
export default Recovery;