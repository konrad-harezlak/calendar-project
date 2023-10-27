import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './messages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from './AuthContext'

const Messages = () => {
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const [users, setUsers] = useState([]);
    let [recipient, setRecipient] = useState('');
    const handleSendMessage = async () => {
        try {
            let response = await axios.post('http://localhost:4000/messages', {
                sender: login,
                recipient: recipient.userName,
                content: message,
            });
            console.log("wiadomosc wysłana", response.data);
        } catch (error) {

            console.error("bład podczas wysylania wiadomosci: ", error)
        }
    }


    //Fetching users from the database
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await axios.get('http://localhost:4000/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania użytkowników: ", error);
            }
            console.log(users)
        };

        fetchUsers();
    }, []);

    return (
        <div className='messages_page'>
            <Navigation />
            <div className='messages_container'>
                <div className='messages_header'>
                    <p>
                        {recipient.firstName || recipient.lastName ? (
                            <h2>{recipient.firstName} {recipient.lastName}</h2>
                        ) : (
                           <h2> {recipient.userName}</h2>)}
                    </p>
                </div>

                <div className='messages'>

                </div>
                <div className='write_message'>
                    <input
                        type='text'
                        placeholder='Napisz wiadomość..'
                        value={message}
                        onChange={(e => setMessage(e.target.value))}></input>
                    <button onClick={handleSendMessage}> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
                </div>
            </div>
            <div className='users_container'>
                <div className='users_header'>
                    <p>Czaty</p>
                </div>
                <ul>
                    {users.map(user => (
                        <li className='user' key={user.userName}>
                            <div className='user-details'>
                                {!user.firstName && !user.lastName && <span>{user.userName}</span>}
                                {user.firstName && <span>{user.firstName}</span>}
                                {user.lastName && <span>{user.lastName}</span>}
                            </div>
                            <div className='user-actions'>
                                <button onClick={() => setRecipient(user)}>Wiadomość</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}
export default Messages;