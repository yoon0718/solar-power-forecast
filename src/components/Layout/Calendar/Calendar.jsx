// import moment from 'moment';
// import React, {useState} from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

import { useEffect } from "react";

// function Calendarview() {
//     const [value, onChange] = useState(new Date());
//     console.log(new Date())

//     return (
//         <div>
//             <Calendar onChange={onChange} value={value}/>
//                 <div className='text-gray-500 mt-4'>
//                     {moment(value).format("YYYY년 MM월 DD일")}
//                 </div>
//         </div>
//     )
// }

// export default Calendarview;

const Calendar = () => {

    useEffect(() => {
        document.querySelector('#date > input').value = new Date().toISOString().substring(0, 10)
    },[])

    return (
    <div className="datediv">
        <label for="date" id="date"><span id="cal">날짜(2020년 이후) : &nbsp;</span> 
            <input type="date"
            id="date"
            max="2024-02-29"
            min="2020-01-01"/>
        </label>
    </div>
    )
}

export default Calendar;