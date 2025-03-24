import React from 'react';
import s from './MainNews.module.css';

import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';

import arrow from '../../assets/icons/government_link_button.svg';

const MainNews = ({mainNews}) => {

   return (
      <div className={s.lastNewsContainer}>
         <div className={s.mainNewsContainer}>
            <div className={s.imgContainer}>
               {mainNews?.image_preview && <img src={mainNews.image_preview} alt="" />}
            </div>
            <div className={`mt24 description`}>Главная новость недели, {mainNews?.dateTime}</div>
            <div className={`mt16 ${s.mainNewsTitle}`}>{mainNews?.name}</div>
            <NavLink to={`${ROUTER.newsArticle}${mainNews?.id}`} className={`mt24 btnY btnArrow`}>Подробнее <img src={arrow} alt="" /></NavLink>
         </div>
      </div>
   )
}
export default MainNews;