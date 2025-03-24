import React from 'react';
import s from './GovernmentServicesLarge.module.css';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';

const GovernmentServicesLarge = (props) => {
   return (
      <a href='https://pos.gosuslugi.ru/form/?opaId=476&fz59=false' type="banner" target='_blank' className={s.bannerContainer}>
         <div className={s.topContainer}>
            <div className={s.title}>
               <div>Не убран мусор,</div>
               <div>яма на дороге,</div>
               <div>не горит фонарь?</div>
            </div>
            <div className={s.textBody}>
               <div>Столкнулись с проблемой —</div>
               <div>сообщите о ней!</div>
            </div>
         </div>

         <div className={`btnGosBanner ${s.button}`}>Сообщить о проблеме</div>
      </a>
   )
}
export default GovernmentServicesLarge;