import React, { useState } from 'react';

const DaySchedule = ({ day, meetings, onClose, onScheduleMeeting, month, year }) => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [participantsList, setParticipantsList] = useState([]);

    const handleScheduleMeeting = (event) => {
        event.preventDefault();
        if (meetingTitle && meetingDate && meetingTime) {
            onScheduleMeeting(meetingTitle, meetingDate, meetingTime, participantsList);
            setMeetingTitle('');
            setMeetingDate('');
            setMeetingTime('');
            setParticipantsList([]);
        }
    };

    const handleAddParticipant = () => {
        if (selectedParticipant && !participantsList.includes(selectedParticipant)) {
            setParticipantsList([...participantsList, selectedParticipant]);
        }
    };

    const handleButtonClick = (event) => {
        event.stopPropagation();
        onClose();
    };

    return (
        <div className="fullscreen-day-schedule" >
            <div className="day-schedule">
                <h1>Spotkania dla {day}.{month}.{year}</h1>
                <ul>
                    {meetings.map((meeting, index) => (
                        <li key={index}>{meeting}</li>
                    ))}
                </ul>
                <form onSubmit={handleScheduleMeeting}>
                    <label htmlFor="title">Tytuł:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Tytuł spotkania"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                    <label htmlFor="date">Data:</label>
                    <input
                        type="date"
                        id="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                    />
                    <label htmlFor="time">Czas:</label>
                    <input
                        type="time"
                        id="time"
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                    />
                    <label htmlFor="participants">Uczestnicy:</label>
                    <select
                        id="participants"
                        value={selectedParticipant}
                        onChange={(e) => setSelectedParticipant(e.target.value)}
                    >
                        <option value="">Wybierz uczestnika</option>
                        <option value="Uczestnik 1">Uczestnik 1</option>
                        <option value="Uczestnik 2">Uczestnik 2</option>
                    </select>
                    <button type="button" onClick={handleAddParticipant}>Dodaj uczestnika</button>
                    <ul>
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
