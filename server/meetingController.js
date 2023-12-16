const Meeting = require('./meetingModel');
const jwt = require('jsonwebtoken');

const isUserAvailable = async (userName, date, startTime, endTime) => {
    try {
        const existingMeetings = await Meeting.find({
            participants: userName,
            date: date,
            $and: [
                { time: { $lt: endTime } },
                { endTime: { $gt: startTime } },
            ],
        });
        return existingMeetings.length === 0;
    } catch (error) {
        console.error('Error while checking user availability:', error);
        return false;
    }
};

const createMeeting = async (req, res) => {
    try {
        console.log("meetingController.createMeeting")
        const { title, date, time, endTime, participants } = req.body;
        const token = req.headers.authorization;
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userName = decodedToken.userName;

        const isCreatorAvailable = await isUserAvailable(userName, date, time, endTime);

        if (!isCreatorAvailable) {
            console.log("User already has a meeting scheduled at this time.", isCreatorAvailable);
            return res.status(409).json({ error: 'User already has a meeting scheduled at this time.' });
        }

        for (const participant of participants) {
            const isParticipantAvailable = await isUserAvailable(participant, date, time, endTime);

            if (!isParticipantAvailable) {
                console.log(`Participant ${participant} already has a meeting scheduled at this time.`);
                return res.status(410).json({ error: `Participant ${participant} already has a meeting scheduled at this time.` });
            }
        }

        if (!participants.includes(userName))
            participants.push(userName);

        const newMeeting = new Meeting({
            title,
            date,
            time,
            endTime,
            participants,
        });

        const savedMeeting = await newMeeting.save();
        console.log('Meeting saved in the database');
        res.status(200).json(savedMeeting);
    } catch (error) {
        console.error('Error while saving meeting:', error);
        res.status(500).json({ error: 'Error while saving meeting.' });
    }
};

const readMeetings = async (req, res) => {
    try {
        const selectedDate = req.query.date;
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const meetings = await Meeting.find({ participants: decodedToken.userName, date: selectedDate });
        console.log('Meetings read from the database');
        res.status(200).json(meetings);
    } catch (error) {
        console.error('Error while reading meetings:', error);
        res.status(500).json({ error: 'Error while reading meetings.' });
    }
};

const deleteParticipantFromMeeting = async (req, res) => {
    const meetingId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userName = decodedToken.userName;
    try {
        const meeting = await Meeting.findOne({ _id: meetingId });
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting with the specified identifier not found.' });
        }

        const participantIndex = meeting.participants.findIndex(participant => participant === userName);
        if (participantIndex === -1) {
            return res.status(404).json({ error: 'User with the specified identifier is not a participant in this meeting.' });
        }
        meeting.participants.splice(participantIndex, 1);
        await meeting.save();

        res.status(200).json({ message: 'User has been removed from the meeting.' });
    } catch (error) {
        console.error('Error while removing participant from meeting:', error);
        res.status(500).json({ error: 'Error while removing participant from meeting.' });
    }
};

module.exports = {
    createMeeting,
    readMeetings,
    deleteParticipantFromMeeting,
    isUserAvailable
};