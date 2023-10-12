import React from 'react';
import Navigation from './Navigation';
import './messages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const Messages=()=>{
    return(
        <div className='messages_page'>
                <Navigation/>
                <div className='messages_container'>
                    <div className='messages'>

                    </div>
                    <div className='write_message'>
                        <input type='text' placeholder='Napisz wiadomość..'></input>
                        <button> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
                    </div>
                </div>
                <div className='users_container'>
                    <div className='users_header'>
                        <p>Czaty</p>
                    </div>
                    
                </div>
        </div>
    )

}
export default Messages;