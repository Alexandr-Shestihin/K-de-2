import React from 'react';
import s from './News.module.css';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';

const News = ({ news, mobilFullPhoto }) => {
   return (
      <div className={s.newsWrapper}>
         {news?.map((el, i) =><NavLink to={`${ROUTER.newsArticle}${el.id}`} key={i}
            className={`${s.newsContainer}`}
         >
            <div className={s.newsContainer}>
               <div className={`${s.preview} ${mobilFullPhoto || s.previewMobilHidden}`}><img src={el.image_preview} alt="" /></div>
               <div className={s.textContainer}>
                  <div className={`${s.filterText} mt20 `}>{el.dateTime}</div>
                  <div className={s.title}>{el.name}</div>
               </div>
            </div>
         </NavLink>)}
      </div>
   )
}
export default News;