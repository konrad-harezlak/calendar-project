import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './messages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Messages = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    let [recipient, setRecipient] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        try {
            const token = localStorage.getItem('token');
            let response = await axios.post('https://calendar-a5id.onrender.com/messages', {
                recipient: recipient._id,
                content: message,
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            console.log("wiadomosc wysłana", response.data);
            setMessages([...messages, response.data]);
            setMessage('');
        } catch (error) {

            console.error("bład podczas wysylania wiadomosci: ", error)
        }
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await axios.get('https://calendar-a5id.onrender.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania użytkowników: ", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://calendar-a5id.onrender.com/messages/${recipient._id}`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania wiadomości: ", error);
            }
        };

        if (recipient._id) {
            fetchMessages();
        }
    }, [recipient._id]);
    return (
        <div className='messages_page'>
            <Navigation />
            {recipient && (
                <div className='messages_container'>
                    <div className='messages_header'>
                        <p>
                            {recipient.firstName || recipient.lastName ? (
                                <h2>{recipient.firstName} {recipient.lastName}</h2>
                            ) : (
                                <h2>{recipient.userName}</h2>)}
                        </p>
                    </div>

                    <div className='messages'>
                        {messages.map(message => (
                            <div key={message._id} className={message.sender === recipient._id ? 'received-message' : 'sent-message'}>
                                {message.content}
                            </div>
                        ))}
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
            )}
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