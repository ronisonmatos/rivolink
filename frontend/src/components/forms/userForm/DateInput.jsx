import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput() {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div>
      <label htmlFor="dateInput">Data:</label>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        id="dateInput"
      />
    </div>
  );
}

export default DateInput;