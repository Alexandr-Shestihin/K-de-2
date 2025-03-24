import React from "react";
import s from "./NewsForSearch.module.css";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";

const NewsForSearch = ({
   title,
   text,
   date,
   img,
   id
}) => {

   const clearHTML = (text) => {
      return text?.replace(/<p>(\s|(&nbsp))<\/p>/gmi, '')
   }

   return (
      <NavLink to={`${ROUTER.newsArticle}${id}`} className={s.newsContainer}>
         <div
            className={s.link}
         >
            <div className={s.innerContainer}>
               <div className={s.imgContainer}>
                  <div className={s.newsIcon}>
                     <img src={`https://sdhimki.ru/${img}`} alt="" />
                  </div>
               </div>
               <div className={s.textInner}>
                  <div className={s.title}>{title}</div>
                  <div dangerouslySetInnerHTML={{ __html: clearHTML(text) }} className="mt4"></div>
                  {date && <div className={`${s.datePublication} mt8`}>{date}</div>}
               </div>
            </div>
            <div className={s.btnType}>Новости</div>
         </div>

      </NavLink>
   );
};
export default NewsForSearch;
