import React from "react";
import s from "./DeputatForSearch.module.css";

const DeputatForSearch = ({
   title,
   text,
   img
}) => {

   const clearHTML = (text) => {
      return text?.replace(/<p>(\s|(&nbsp))<\/p>/gmi, '')
   }

   return (
      <div className={s.deputatContainer}>
         <div
            className={s.link}
         >
            <div className={s.innerContainer}>
               <div className={s.imgContainer}>
                  <div className={s.deputatIcon}>
                     <img src={img} alt="" />
                  </div>
               </div>
               <div className={s.textInner}>
                  <div className={s.title}>{title}</div>
                  <div dangerouslySetInnerHTML={{ __html: clearHTML(text) }} className="mt4"></div>
               </div>
            </div>
            <div className={s.btnType}>Депутаты</div>

         </div>

      </div>
   );
};
export default DeputatForSearch;
