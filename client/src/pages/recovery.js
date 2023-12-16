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
                    <p>We have sent you a code to your email:</p>
                    <input type='text' placeholder='Code...' />
                </label>
                <br />
                <button type='submit' className='button_login'>Send!</button>
            </form>
            <p className='p_link'><a href="/" className='link'>Log in!</a></p>
            <p className='p_link'><a href="/registration" className='link'>Register!</a></p>`;
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
                <form>
                    <label>
                        <p>Forgot your password?</p>
                        <input type='email' placeholder='Enter your E-mail...' />
                    </label>
                    <br />
                    <button id="btn" className='button_login' type='button'>Send!</button>
                </form>
                <p className='p_link'><Link to="/" className='link'>Log in!</Link></p>
                <p className='p_link'><Link to="/registration" className='link'>Register!</Link></p>
            </div>
        </div>

    )

}
export default Recovery;