import React, { useState, useEffect } from 'react';
import './pomodoro.css';
import Navigation from '../Navigation/Navigation';

const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Pomodoro = () => {
    const [seconds, setSeconds] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const [, setIsBreak] = useState(false);
    const [breakDuration] = useState(300);
    const [longBreakDuration] = useState(1800);

    useEffect(() => {
        let interval;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (isActive && seconds === 0) {
            alert("Pomodoro Completed!");
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsBreak(false);
        setSeconds(1500);
    };

    const startBreak = (duration) => {
        setIsActive(true);
        setIsBreak(true);
        setSeconds(duration);
    };

    return (
        <div className="home_page">
            <Navigation />
            <div className="pomodoro_container">
                <h1>Pomodoro Timer</h1>
                <p>{formatTime(seconds)}</p>
                <button onClick={toggleTimer} className={isActive ? "pauseButton" : "startButton"}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer} className="resetButton">Reset</button>
                <button onClick={() => startBreak(breakDuration)} className="breakButton">Start 5-Min Break</button>
                <button onClick={() => startBreak(longBreakDuration)} className="longBreakButton">Start 30-Min Break</button>
            </div>
        </div>
    );
}

export default Pomodoro;
