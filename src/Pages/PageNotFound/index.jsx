import React from 'react';
import s from './PageNotFound.module.css';

import ContantContainerMain from '../../total/ContantContainerMain';

import pageNotFound from '../../assets/img/PageNotFound/page_not_found.png';

import { NavLink } from "react-router-dom";
import { ROUTER } from '../../config';

const PageNotFound = (props) => {
   return (
      <div>
         <ContantContainerMain>
            <div className={s.container}>
               <div className="mt120">
                  <div className={s.imgContainer}><img src={pageNotFound} alt="" /></div>
               </div>

               <div className={`mt48 ${s.text}`}>
                  Извините за неудобства, страница находится в разработке. Необходимую информацию вы можете найти на старой версии сайта. Используйте кнопку ниже.
               </div>

               <NavLink to={ROUTER.main} className={`mt48 btnRad ${s.btn}`}>Предыдущая версия сайта</NavLink>
            </div>
         </ContantContainerMain>
      </div>
   )
}
export default PageNotFound;