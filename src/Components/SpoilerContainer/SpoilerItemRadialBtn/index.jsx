import React, { Children, useState, useRef } from 'react';
import s from './SpoilerItemRadialBtn.module.css';

import arrow from '../../../assets/icons/arrowDownSelect.svg';

const SpoilerItemRadialBtn = ({ children, title }) => {

   const itemRef = useRef(null);

   const [isOpen, setIsOpen] = useState(null);

   const clickHandler = (id) => {
      setIsOpen(!isOpen)
   }
   
   return (
      <div className={`borderMain ${s.border}`}>
         <div className={` ${s.spoilerItemHead}`} onClick={clickHandler}>{title}
            {children && <div className={s.btn}>
               <img className={isOpen && s.rotate} src={arrow} alt="" />
            </div>}
         </div>
         <div
            style={
               isOpen ? { height: itemRef.current.scrollHeight } : { height: '0px' }
            }
            className={`${s.spoilerCollapse} `} ref={itemRef}>
            {children}
         </div>
      </div>
   )
}
export default SpoilerItemRadialBtn;