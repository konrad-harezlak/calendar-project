import React, { useState, useEffect } from 'react';
import axios from '../../api';

const DaySchedule = ({ onClose, selectedDate }) => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [participantsList, setParticipantsList] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [users, setUsers] = useState([]);
    const [scheduleForFiveDays, setScheduleForFiveDays] = useState(false);
    let [formattedDate] = useState(new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]))
    const fetchMeetings = async () => {
        try {
            const token = localStorage.getItem('token');
            let url = `/meetings?date=${formattedDate.toUTCString()}`
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `${token}`
                }
            });

            setMeetings(response.data);
        } catch (error) {
            console.error('Error with fetching meetings: ', error);
        }
    };
    useEffect(() => {
        fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedDate]);

    const handleCheckboxChange = () => {
        setScheduleForFiveDays(!scheduleForFiveDays);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error with fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);

    const handleScheduleMeeting = async (event) => {
        event.preventDefault();
        if (!meetingTitle || !selectedTime || participantsList.length <= 0) {
            console.log("Fill you form.");
            return;
        }

        const startTime = new Date(formattedDate.toISOString().split('T')[0] + 'T' + selectedTime);
        const endTime = new Date(formattedDate.toISOString().split('T')[0] + 'T' + selectedEndTime);

        if (endTime <= startTime) {
            alert("The end time must be after the start time. ");
            return;
        }
        try {
            const date = formattedDate.toUTCString();

            if (scheduleForFiveDays) {
                let canSchedule = true;

                for (let i = 0; i < 5; i++) {
                    const newDate = new Date(formattedDate.toUTCString());
                    newDate.setDate(newDate.getDate() + i);

                    for (const participant of participantsList) {
                        const isAvailable = await axios.get('/isUserAvailable', {
                            params: {
                                userName: participant,
                                date: newDate.toUTCString(),
                                startTime: selectedTime,
                                endTime: selectedEndTime,
                            },
                        });

                        if (!isAvailable.data.isAvailable) {
                            canSchedule = false;
                            alert(`User ${participant} already has a scheduled meeting on ${new Date(newDate).getDate()}-${new Date(newDate).getMonth() + 1}-${new Date(newDate).getFullYear()} at the specified time.`);
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

                        const response = await axios.post('/meetings', {
                            title: meetingTitle,
                            date: newDate.toUTCString(),
                            time: selectedTime,
                            participants: participantsList,
                        });

                        console.log('Meeting saved:', new Date(response.data.date));
                    }
                }
            } else {
                let canSchedule = true;
                for (const participant of participantsList) {
                    const newDate = new Date(formattedDate.toUTCString());
                    const isAvailable = await axios.get('/isUserAvailable', {
                        params: {
                            userName: participant,
                            date: newDate,
                            startTime: selectedTime,
                            endTime: selectedEndTime,
                        },
                    });
                    if (!isAvailable.data.isAvailable) {
                        canSchedule = false;
                        alert(`User ${participant} already has a schedulded meeting on ${formattedDate.toISOString().split('T')[0]} at the specified time.`);
                        break;
                    }
                }

                if (canSchedule) {
                    const token = localStorage.getItem('token');
                    const response = await axios.post('/meetings', {
                        title: meetingTitle,
                        date: date,
                        time: selectedTime,
                        endTime: selectedEndTime,
                        participants: participantsList,

                    }, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });

                    console.log('Meeting saved:', new Date(response.data.date));
                    fetchMeetings();
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("You have already saved meeting at specified time.");
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
            await axios.delete(`/meetings/${meetingId}`);
            const updatedMeetings = meetings.filter(meeting => meeting._id !== meetingId);
            setMeetings(updatedMeetings);
            console.log('Meeting deleted: ', meetingId);
        } catch (error) {
            console.error('Error occurred while deleting meeting: ', error);
        }
    };


    return (
        <div className="fullscreen-day-schedule">
            <div className="day-schedule">
                <h1>Meetings for {selectedDate[2]}.{selectedDate[1]}.{selectedDate[0]}</h1>
                <div className="meetings-list">
                    <h2>Meetings:</h2>
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
                                    <button type="button" onClick={() => handleDeleteMeeting(meeting._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleScheduleMeeting}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Meeting Title"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                    <label htmlFor="time">Start time:</label>
                    <input
                        type="time"
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <label htmlFor="endTime">End time:</label>
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
                        Plan for 5 working days (daily)
                    </label>
                    <label>Participants:</label>
                    <select
                        value={selectedParticipant}
                        onChange={(e) => setSelectedParticipant(e.target.value)}
                    >
                        <option value="">Choose Participant</option>
                        {users.map((user) => (
                            <option key={user._id} value={user.userName}>
                                {user.userName} {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddParticipant}>
                        Add Participant
                    </button>
                    <ul className="participants-list">
                        {participantsList.map((participant, index) => (
                            <li key={index}>{participant}</li>
                        ))}
                    </ul>
                    <button type="submit">Submit</button>
                </form>
                <button className="close-button" onClick={handleButtonClick}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default DaySchedule;
