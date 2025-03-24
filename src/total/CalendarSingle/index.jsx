import { useState, useCallback, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import s from './index.css'

/* Форматор - преобразует дату */
import { formatterCalendar } from '../../utils/';

export default function CalendarSingle({ onChange }) {
   const [value, setValue] = useState([]);

   const onHandler = useCallback(
      (val) => {
         onChange(formatterCalendar.format(val))
         setValue(val);
      },
      [setValue],
   );

   return <span className='calendar'>
      <Calendar locale='ru-RU'
         prev2Label={<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.97561 12L7 10.9714L2.04878 6L7 1.02857L5.97561 0L0 6L5.97561 12Z" fill="#757575" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.9756 12L14 10.9714L9.04878 6L14 1.02857L12.9756 0L7 6L12.9756 12Z" fill="#757575" />
         </svg>
         }
         prevLabel={<svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.97561 12.1003L7 11.0718L2.04878 6.10034L7 1.12891L5.97561 0.100342L0 6.10034L5.97561 12.1003Z" fill="#303030" />
         </svg>}
         nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.09153 12L0.0671391 10.9714L5.01836 6L0.0671387 1.02857L1.09153 0L7.06714 6L1.09153 12Z" fill="#303030" />
         </svg>}
         next2Label={<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.09153 12L0.0671391 10.9714L5.01836 6L0.0671387 1.02857L1.09153 0L7.06714 6L1.09153 12Z" fill="#757575" />
            <path fillRule="evenodd" clipRule="evenodd" d="M8.02439 12L7 10.9714L11.9512 6L7 1.02857L8.02439 0L14 6L8.02439 12Z" fill="#757575" />
         </svg>
         }
         /* selectRange */
         onChange={onHandler}
         value={value}
      />
   </span>;
}