import React from 'react';
import s from './GovernmentServices.module.css';

const GovernmentServices = (props) => {
   return (
      <a href="https://pos.gosuslugi.ru/lkp/polls/440140/?utm_source=widget&utm_medium=municipality&utm_campaign=pos.gosuslugi.ru&utm_content=46783000" type="banner" target='_blank' className={`borderMain ${s.bannerContainer}`}>
         <div className={s.topContainer}>
            <div className={s.title}>
               <div>Мой выбор,</div>
               <div>Моё будущее</div>
            </div>
            <div className={s.textBody}>
               <div>Общественное голосование</div>
               <div>на портале Госуслуг</div>
            </div>
         </div>

         <div className={`btnGosBanner ${s.button}`}>Подать обращение</div>
      </a>
   )
}
export default GovernmentServices;