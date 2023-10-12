import React from 'react';
import './day.css'

const Day = ({ day,dayOfWeek,daysOfMonth}) => {
  let number;
  if(day>=daysOfMonth && daysOfMonth!==0)
    number=day-daysOfMonth+1;
  else if(daysOfMonth===0)
    number=day;
  else
    number=day+1;

  return (

    <div className='day'>
        <p>{dayOfWeek}</p>
      <h1>{number}</h1>
    </div>

  );
};

export default Day;
