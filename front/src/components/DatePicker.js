import React, { useState } from 'react';

export default function DatePicker(props) {
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = selectedDate.replace(/-/g, ''); // '-' 문자 제거
    props.setSelectedDate(formattedDate);
  };

  return (
    <div className="datediv">
      <label htmlFor="date" id="date">
        <span id="cal">날짜(2020년 이후) : &nbsp;</span>
        <input type="date" id="date" max="2024-12-31" min="2020-01-01" onChange={handleDateChange} />
      </label>
    </div>
  );
}
