import React,{useState} from 'react';
import './day.css'
import DaySchedule from './daySchedule';
const Day = ({ day, daysOfMonth, option,dayOfWeek,month,year }) => {
  let [isModalVisible, setModalVisible] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState('');
  
  const handleScheduleMeeting = (event) => {
    event.preventDefault();
    if (newMeeting) {
      setMeetings([...meetings, newMeeting]);
      setNewMeeting('');
    }
  };

  let number;
  if (option == 0) number = daysOfMonth - day + 2;
  else if (option == 1) number = day - 1;
  else if (option == 2) number = day;
  return (
    <div 
    className='day'
     onClick={()=>{
      if ((!dayOfWeek || (dayOfWeek !== 'Sobota' && dayOfWeek !== 'Niedziela')) && (option!=0 && option!=2)) {
        setModalVisible(true);
      }
     }}
    style={
      {
        ...(option === 2 || option === 0 ? { backgroundColor: '#0005' } : null),
        ...(dayOfWeek == "Sobota" || dayOfWeek == "Niedziela" ? { backgroundColor: '#0005' } : null)
      }
    }>  
      <h1>{number}</h1>
      {isModalVisible && (
        <DaySchedule
          day={day-1}
          month={month+1}
          year={year}
          meetings={meetings}
          onClose={() => {setModalVisible(false)}}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}
    </div>

  );
};

export default Day;
