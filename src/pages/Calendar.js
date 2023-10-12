import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './calendar.css'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Day from './day';
const Calendar = () => {

    //zmiana uzytkownika
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const today = new Date();
    let [year, setYear] = useState(today.getFullYear());
    let [month, setMonth] = useState(today.getMonth());
    let [dayElements, setDayElements] = useState([]);

    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    let getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDate()
    let getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    let dateElement = "";
    const handleClickNext = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const handleClickPrev = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };
    useEffect(() => {
        dateElement = document.getElementById('date');
        showDaysInMonth();
        return () => {
        };
    }, [month]);

    const checkLastDayOfLastMonth = (year, month) => {
        if (month === 0) {
            month = 12;
            year -= 1;
        } else {
            month -= 1;
        }
        return getLastDayOfMonth(year, month);

    }
    const showDaysInMonth = () => {
        let FirstDay = getFirstDayOfMonth(year, month);
        let DaysOfMonth = getLastDayOfMonth(year, month);
        let i=0,j=1;
        
        console.log(DaysOfMonth);
        console.log(days[FirstDay]);
        console.log(FirstDay);
        let arr = [];

    switch(FirstDay){      
        case 0:
            arr.push(<Day day={checkLastDayOfLastMonth(year, month)} daysOfMonth={6-j} dayOfWeek={days[j]} />)
            j++;
        case 6:
            arr.push(<Day day={checkLastDayOfLastMonth(year, month)} daysOfMonth={6-j} dayOfWeek={days[j]} />)
            j++
        case 5:
            arr.push(<Day day={checkLastDayOfLastMonth(year, month)} daysOfMonth={6-j} dayOfWeek={days[j]} />)
            j++
        case 4:
            arr.push(<Day day={checkLastDayOfLastMonth(year, month)} daysOfMonth={6-j} dayOfWeek={days[j]} />)
            j++
        case 3:
            arr.push(<Day day={checkLastDayOfLastMonth(year, month)} daysOfMonth={6-j} dayOfWeek={days[j]} />)
            j++
        case 2:
            arr.push(<Day day={checkLastDayOfLastMonth(year, month)} daysOfMonth={6-j} dayOfWeek={days[j]} />)
            j++
        case 1:
            while (i < DaysOfMonth || j % 7 !== 1) {
                if (i >= DaysOfMonth)
                    arr.push(<Day day={i} daysOfMonth={DaysOfMonth} dayOfWeek={days[j % 7]} />)
                else
                    arr.push(<Day day={i} dayOfWeek={days[j % 7]} />)
                j++;
                i++;

            }
            console.log("wykonuje się")
        }
       
        setDayElements(arr);
    }




    useEffect(() => {
        dateElement = document.getElementById('date');
        showDaysInMonth();
        return () => {
        };
    }, [month]);



    return (
        <div className='calendar_page'>
            <Navigation />
            <div className='calendar_container'>
                <header>
                    <div className='calendar_date'>

                        <button className='arrows' onClick={() => { handleClickPrev(); showDaysInMonth(); }}><FontAwesomeIcon className='arrows_icon' icon={faChevronLeft} /></button>
                        <div id='date'><h2>{months[month]}.{year}</h2></div>
                        <button className='arrows' onClick={() => { handleClickNext(); showDaysInMonth(); }}><FontAwesomeIcon className='arrows_icon' icon={faChevronRight} /></button>

                    </div>
                    <div className='calendar_user'>
                        <h3>Wybierz Uzytkownika:</h3>
                        <div className='select_container'>
                            <select value={selectedOption} onChange={handleSelectChange}>
                                <option value="">Wybierz...</option>
                                <option value="opcja1">Opcja 1</option>
                                <option value="opcja2">Opcja 2</option>
                                <option value="opcja3">Opcja 3</option>
                            </select>
                        </div>
                        {selectedOption && <h4>Wybrano: {selectedOption}</h4>}
                    </div>
                </header>


                <div className='calendar_grid' >
                    {dayElements}
                </div>
            </div>
        </div>
    )

}
export default Calendar;