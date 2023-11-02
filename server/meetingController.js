const Meeting = require('./meetingModel');

const createMeeting = async (title, date, time, participants) => {
    try {
        const newMeeting = new Meeting({
            title,
            date,
            time,
            participants,
        });
        const savedMeeting = await newMeeting.save();
        console.log('Spotkanie zapisane w bazie danych:', savedMeeting);
        return savedMeeting;
    } catch (error) {
        console.error('Błąd podczas zapisywania spotkania:', error);
        throw error; 
    }
};
const readMeetings = async () => {
    try {
        const meetings = await Meeting.find();
        console.log('Spotkania odczytane z bazy danych:', meetings);
        return meetings;
    } catch (error) {
        console.error('Błąd podczas odczytu spotkań:', error);
        throw error; // Rzucanie błędu, który może być obsłużony w wywołującym kodzie
    }
};
module.exports = {
    createMeeting,
    readMeetings
};
