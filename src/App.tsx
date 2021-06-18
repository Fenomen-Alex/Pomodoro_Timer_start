import React, {useRef, useState} from 'react';
import './App.css';

const padTime = (time: number) => {
  return time.toString().padStart(2, '0')
}

export default function App(): JSX.Element {

  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (): void => {
    setTitle(`You're doing great!`);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if(timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = (): void => {
    if(intervalRef.current === null) return;

    clearInterval(+intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false);
  };

  const resetTimer = (): void => {
    clearInterval(+intervalRef.current!);
    setTitle('Ready to go another round?');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const minutes = +padTime(+Math.floor(timeLeft / 60).toString().padStart(2, '0'));
  const seconds = padTime(timeLeft - minutes * 60).toString().padStart(2, '0');

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer} >Reset</button>
      </div>
    </div>
  );
}
