import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaySchedule = ({ onClose, selectedDate }) => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [participantsList, setParticipantsList] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [users, setUsers] = useState([]);
    const [scheduleForFiveDays, setScheduleForFiveDays] = useState(false);
    let [response] = useState('');
    let [formattedDate] = useState(new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]))
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                let url = `https://calendar-a5id.onrender.com/meetings?date=${formattedDate.toUTCString()}`
                let response = await axios.get(url);

                setMeetings(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania spotkań:', error);
            }
        };

        fetchMeetings();
    }, [formattedDate]);

    const handleCheckboxChange = () => {
        setScheduleForFiveDays(!scheduleForFiveDays);
    };


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

    const handleScheduleMeeting = async (event) => {
        event.preventDefault();
        if (!meetingTitle || !selectedTime || participantsList.length <= 0) {
            console.log("Wypełnij formularz w pełni.");
            return;
        }

        const startTime = new Date(formattedDate.toISOString().split('T')[0] + 'T' + selectedTime);
        const endTime = new Date(formattedDate.toISOString().split('T')[0] + 'T' + selectedEndTime);

        if (endTime <= startTime) {
            alert("Czas zakończenia musi być po czasie rozpoczęcia.");
            return;
        }
        try {
            const date = formattedDate.toUTCString();

            if (scheduleForFiveDays) {
                let canSchedule = true;

                for (let i = 0; i < 5; i++) {
                    const newDate = new Date(formattedDate);
                    newDate.setDate(newDate.getDate() + i);

                    for (const participant of participantsList) {
                        const isAvailable = await axios.get('https://calendar-a5id.onrender.com/isUserAvailable', {
                            params: {
                                userName: participant,
                                date: newDate.toUTCString(),
                                startTime: selectedTime,
                                endTime: selectedEndTime,
                            },
                        });

                        if (!isAvailable.data.isAvailable) {
                            canSchedule = false;
                            alert(`Użytkownik ${participant} ma już umówione spotkanie w dniu ${newDate.toISOString().split('T')[0]} o podanym czasie.`);
                            break;
                        }
                    }

                    if (!canSchedule) {
                        break;
                    }
                }

                if (canSchedule) {
                    for (let i = 0; i < 5; i++) {
                        const newDate = new Date(formattedDate);
                        newDate.setDate(newDate.getDate() + i);

                        const response = await axios.post('https://calendar-a5id.onrender.com/meetings', {
                            title: meetingTitle,
                            date: newDate.toUTCString(),
                            time: selectedTime,
                            participants: participantsList,
                        });

                        console.log('Spotkanie zapisane:', new Date(response.data.date));
                    }
                }
            } else {
                let canSchedule = true;

                for (const participant of participantsList) {
                    const isAvailable = await axios.get('https://calendar-a5id.onrender.com/isUserAvailable', {
                        params: {
                            userName: participant,
                            date: date,
                            startTime: selectedTime,
                            endTime: selectedEndTime,
                        },
                    });

                    if (!isAvailable.data.isAvailable) {
                        canSchedule = false;
                        alert(`Użytkownik ${participant} ma już umówione spotkanie w dniu ${formattedDate.toISOString().split('T')[0]} o podanym czasie.`);
                        break;
                    }
                }

                if (canSchedule) {
                    const response = await axios.post('https://calendar-a5id.onrender.com/meetings', {
                        title: meetingTitle,
                        date: date,
                        time: selectedTime,
                        endTime: selectedEndTime,
                        participants: participantsList,
                    });

                    console.log('Spotkanie zapisane:', new Date(response.data.date));
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("Masz już umówione spotkanie w tym czasie.");
                console.log(error.response.status)
            } else if (error.response && error.response.status === 410) {
                alert(error.response.data.error)
            }
        }
    };
    const handleAddParticipant = () => {
        if (selectedParticipant && !participantsList.includes(selectedParticipant)) {
            setParticipantsList([...participantsList, selectedParticipant]);
        }
        setSelectedParticipant('');
    };

    const handleButtonClick = (event) => {
        event.stopPropagation();
        onClose();
    };

    const handleDeleteMeeting = async (meetingId) => {
        try {
            await axios.delete(`https://calendar-a5id.onrender.com/meetings/${meetingId}`);
            const updatedMeetings = meetings.filter(meeting => meeting._id !== meetingId);
            setMeetings(updatedMeetings);
            console.log('Spotkanie usunięte:', meetingId);
        } catch (error) {
            console.error('Błąd podczas usuwania spotkania:', error);
        }
    };


    return (
        <div className="fullscreen-day-schedule">
            <div className="day-schedule">
                <h1>Spotkania dla {selectedDate[2]}.{selectedDate[1]}.{selectedDate[0]}</h1>
                <div className="meetings-list">
                    <h2>Spotkania:</h2>
                    <ul>
                        {meetings.map((meeting, index) => (
                            <li className="meeting-item" key={meeting._id}>
                                <div className="meeting-details">
                                    <span className="meeting-title"><h2>{meeting.title}</h2></span>
                                    <span className="meeting-time"><time>{meeting.time}-{meeting.endTime}</time></span>
                                    <br />
                                    <span className="participants">Participants: {meeting.participants.join(', ')}</span>
                                </div>
                                <div className="meeting-actions">
                                    <button type="button" onClick={() => handleDeleteMeeting(meeting._id)}>Usuń</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleScheduleMeeting}>
                    <label htmlFor="title">Tytuł:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Tytuł spotkania"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                    <label htmlFor="time">Czas rozpoczęcia:</label>
                    <input
                        type="time"
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <label htmlFor="endTime">Czas zakończenia:</label>
                    <input
                        type="time"
                        id="endTime"
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                    />
                    <label htmlFor='daily'>
                        <input
                            id='daily'
                            type="checkbox"
                            checked={scheduleForFiveDays}
                            onChange={handleCheckboxChange}
                        />
                        Planuj na 5 dni roboczych(daily)
                    </label>
                    <label>Uczestnicy:</label>
                    <select
                        value={selectedParticipant}
                        onChange={(e) => setSelectedParticipant(e.target.value)}
                    >
                        <option value="">Wybierz uczestnika</option>
                        {users.map((user) => (
                            <option key={user._id} value={user.userName}>
                                {user.userName} {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddParticipant}>
                        Dodaj uczestnika
                    </button>
                    <ul className="participants-list">
                        {participantsList.map((participant, index) => (
                            <li key={index}>{participant}</li>
                        ))}
                    </ul>
                    <button type="submit">Umów spotkanie</button>
                </form>
                <button className="close-button" onClick={handleButtonClick}>
                    Zamknij
                </button>
            </div>
        </div>
    );
};

export default DaySchedule;
