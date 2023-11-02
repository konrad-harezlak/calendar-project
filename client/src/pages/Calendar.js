import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './calendar.css'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Day from './day';
const Calendar = () => {

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
        let i = 0, x = 1;
        let arr = [];
        FirstDay = (FirstDay == 0 ? 7 : FirstDay)
        while (i < FirstDay - 1) {
            arr.push(<Day
                key={i}
                day={FirstDay - i}
                daysOfMonth={checkLastDayOfLastMonth(year, month)}
                option={0}
                 />)
            i++;
        }
        while (i - FirstDay + 1 < DaysOfMonth) {
            arr.push(<Day
                key={i}
                day={i - FirstDay + 3}
                month={month}
                year={year}
                daysOfMonth={checkLastDayOfLastMonth(year, month)}
                option={1} dayOfWeek={days[(i + 1) % 7]}
                />)
            i++;
        }
        while (i % 7 !== 0) {
            arr.push(<Day
                key={i}
                day={x}
                daysOfMonth={checkLastDayOfLastMonth(year, month)}
                option={2}
                />)
            i++;
            x++;
        }
        setDayElements(arr);
    }

    useEffect(() => {
        dateElement = document.getElementById('date');
        showDaysInMonth();
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
                <div className='days_of_week'>
                    <div>Poniedziałek</div>
                    <div>Wtorek</div>
                    <div>Środa</div>
                    <div>Czwartek</div>
                    <div>Piątek</div>
                    <div>Sobota</div>
                    <div>Niedziela</div>
                </div>
                <div className="calendar_grid">
                    {dayElements}
                </div>
            </div>
        </div>
    )

}
export default Calendar;