import React from 'react';
import s from './MessageErr.module.css';
import infoImg from '../../assets/icons/err_icon.svg';
import infoErr from '../../assets/icons/err_close.svg';

const MessageErr = ({set}) => {
   return (
      <div className={s.successContainer}>
         <div className={s.infoImgContainer}>
            <img src={infoImg} alt="" />
         </div>
         <div className={s.text}>Ошибка! Проверьте правильность заполнения формы</div>
         <div onClick={()=>set(false)} className={s.infoCloseContainer}>
            <img src={infoErr} alt="" />
         </div>
      </div>
   )
}
export default MessageErr;