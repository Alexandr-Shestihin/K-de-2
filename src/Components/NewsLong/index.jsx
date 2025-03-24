import React from 'react';
import s from './NewsLong.module.css';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';

const NewsLong = ({ news, mobilFullPhoto }) => {
   return (
      <div className={s.newsWrapper}>
         {news?.map((el, i) => <NavLink to={`${ROUTER.newsArticle}${el.id}`} key={i}
            className={`${s.newsContainer}`}
         >
            <div className={`${s.preview} ${mobilFullPhoto || s.previewMobilHidden}`}><img src={el.image_preview} alt="" /></div>
            <div className={s.textContain}>
               <div className={`${s.filterText}`}>{el.dateTime}</div>
               <div className={s.title}>{el.name}</div>
               <div className={s.moreDetails}>Подробнее</div>
            </div>
         </NavLink>)}
      </div>
   )
}
export default NewsLong;