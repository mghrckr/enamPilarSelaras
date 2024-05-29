import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const TimePicker = ({ onTimeChange }) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  const handleTimeChange = (newHour, newMinute, newSecond) => {
    const formattedTime = `${newHour.padStart(2, '0')}:${newMinute.padStart(2, '0')}:${newSecond.padStart(2, '0')}`;
    if (moment(formattedTime, 'HH:mm:ss', true).isValid()) {
      onTimeChange(formattedTime);
    }
  };

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setHour(newHour);
    handleTimeChange(newHour, minute, second);
  };

  const handleMinuteChange = (e) => {
    const newMinute = e.target.value;
    setMinute(newMinute);
    handleTimeChange(hour, newMinute, second);
  };

  const handleSecondChange = (e) => {
    const newSecond = e.target.value;
    setSecond(newSecond);
    handleTimeChange(hour, minute, newSecond);
  };

  return (
    <div className='ml-4 flex items-center'>
      <label htmlFor="time" className="mr-2">Select Time:</label>
      <input
        type="text"
        value={hour}
        onChange={handleHourChange}
        placeholder="HH"
        className="shadow border rounded-lg px-2 py-1 w-12 text-center"
      />
      :
      <input
        type="text"
        value={minute}
        onChange={handleMinuteChange}
        placeholder="MM"
        className="shadow border rounded-lg px-2 py-1 w-12 text-center"
      />
      :
      <input
        type="text"
        value={second}
        onChange={handleSecondChange}
        placeholder="SS"
        className="shadow border rounded-lg px-2 py-1 w-12 text-center"
      />
    </div>
  );
};

export default TimePicker;
