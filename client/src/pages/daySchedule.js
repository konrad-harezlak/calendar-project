import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaySchedule = ({ onClose, selectedDate, usersList }) => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [participantsList, setParticipantsList] = useState([]);
    const [meetings, setMeetings] = useState([]);
    let [response] = useState('');
    let [formattedDate] = useState(new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]))
    useEffect(() => {
        const fetchMeetings = async () => {
            //let formattedDate=new Date(selectedDate[0], selectedDate[1]-1, selectedDate[2]);
            try {
                let url = `http://localhost:4000/meetings?date=${formattedDate.toUTCString()}`
                let response = await axios.get(url);

                setMeetings(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania spotkań:', error);
            }
        };

        fetchMeetings();
    }, [formattedDate]);

    const handleScheduleMeeting = async (event) => {
        event.preventDefault();
        if (!meetingTitle || !selectedTime || participantsList.length <= 0) {
            console.log("Wypełnij formularz w pełni.");
            return;
        }
        try {
            // const formattedDate = new Date(selectedDate[0], selectedDate[1]-1, selectedDate[2]+1);
            console.log(formattedDate);
            response = await axios.post('http://localhost:4000/meetings', {
                title: meetingTitle,
                date: formattedDate,
                time: selectedTime,
                participants: participantsList,
            });
            console.log('Spotkanie zapisane:', new Date(response.data.date));;
        } catch (error) {
            console.error('Błąd podczas zapisywania spotkania:', error);
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
            await axios.delete(`http://localhost:4000/meetings/${meetingId}`);
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
                                <span className="meeting-time"><time>{meeting.time}</time></span>
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
                <label htmlFor="time">Czas:</label>
                <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
                <label>Uczestnicy:</label>
                <select
                    value={selectedParticipant}
                    onChange={(e) => setSelectedParticipant(e.target.value)}
                >
                    <option value="">Wybierz uczestnika</option>
                    {usersList.map((user) => (
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
