import React from 'react';
import ContantContainerMain from '../../total/ContantContainerMain';
import s from './Contacts.module.css';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';

const Contacts = (props) => {

   return (
      <div>
         <ContantContainerMain>
            <div className={`mt40 breadcrumbs`}>
               <NavLink to={ROUTER.main} className='breadcrumbsFrom'>Совет депутатов</NavLink>
               <span className='breadcrumbsTo'> / Контакты</span>
            </div>
            <div className="mt40 pageTitle">Контакты</div>

            <div className={`${s.flexContainer} mt40`}>
               <div className={`${s.textContainer} text`}>
                  Представительный орган местного самоуправления муниципального образования «Городской округ Химки Московской области» (Совет депутатов городского округа Химки Московской области)

                  <div className={`${s.description} mt14`}>141400, Московская область, г. Химки, ул. Московская, д.15</div>
                  <a href='mailto:sovetdep-himki@yandex.ru' className={s.description}>sovetdep-himki@yandex.ru</a>
                  <div className={s.description}>+7 (495) 793-50-55</div>
               </div>

               <a href='https://yandex.ru/maps/-/CDto4BlU' type="banner" target='_blank'>
                  <div className={s.imgContainer}>
                     <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A161b1397c9bc4553808278b3fae65eb8a25f387c119557885a06f73bd335faea&amp;source=constructor" width="518" height="240" frameBorder="0"></iframe>
                  </div>
               </a>
            </div>

         </ContantContainerMain>
      </div>
   )
}
export default Contacts;