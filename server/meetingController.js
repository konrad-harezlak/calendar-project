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
        console.error('Błąd podczas sprawdzania dostępności użytkownika:', error);
        return false;
    }
};

const createMeeting = async (req, res) => {
    try {
        const { title, date, time, endTime, participants } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sekretny_token');
        const userName = decodedToken.userName;

        // Sprawdź dostępność użytkownika (twórcy spotkania)
        const isCreatorAvailable = await isUserAvailable(userName, date, time, endTime);

        if (!isCreatorAvailable) {
            console.log("Użytkownik ma już umówione spotkanie w tym czasie.",isCreatorAvailable);
            return res.status(409).json({ error: 'Użytkownik ma już umówione spotkanie w tym czasie.' });
        }

        // Sprawdź dostępność pozostałych uczestników
        for (const participant of participants) {
            const isParticipantAvailable = await isUserAvailable(participant, date, time, endTime);

            if (!isParticipantAvailable) {
                console.log(`Uczestnik ${participant} ma już umówione spotkanie w tym czasie.`);
                return res.status(410).json({ error: `Uczestnik ${participant} ma już umówione spotkanie w tym czasie.` });
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
        console.log('Spotkanie zapisane w bazie danych');
        res.status(200).json(savedMeeting);
    } catch (error) {
        console.error('Błąd podczas zapisywania spotkania:', error);
        res.status(500).json({ error: 'Błąd podczas zapisywania spotkania.' });
    }
};


const readMeetings = async (req, res) => {
    try {
        const selectedDate = req.query.date;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sekretny_token');
        const meetings = await Meeting.find({ participants: decodedToken.userName, date: selectedDate });
        console.log('Spotkania odczytane z bazy danych');
        res.status(200).json(meetings);
    } catch (error) {
        console.error('Błąd podczas odczytu spotkań:', error);
        res.status(500).json({ error: 'Błąd podczas odczytu spotkań.' });
    }
};

const deleteParticipantFromMeeting = async (req, res) => {
    const meetingId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'sekretny_token');
    const userName = decodedToken.userName;
    try {
        const meeting = await Meeting.findOne({_id: meetingId});
        if (!meeting) {
            return res.status(404).json({ error: 'Spotkanie o podanym identyfikatorze nie zostało znalezione.' });
        }

        const participantIndex = meeting.participants.findIndex(participant => participant=== userName);
        if (participantIndex === -1) {
            return res.status(404).json({ error: 'Użytkownik o podanym identyfikatorze nie jest uczestnikiem tego spotkania.' });
        }
        meeting.participants.splice(participantIndex, 1);
        await meeting.save();

        res.status(200).json({ message: 'Użytkownik został usunięty z spotkania.' });
    } catch (error) {
        console.error('Błąd podczas usuwania uczestnika ze spotkania:', error);
        res.status(500).json({ error: 'Błąd podczas usuwania uczestnika ze spotkania.' });
    }
};



module.exports = {
    createMeeting,
    readMeetings,
    deleteParticipantFromMeeting,
    isUserAvailable
};