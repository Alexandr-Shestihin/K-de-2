import React from 'react';
import ContantContainerMain from '../../total/ContantContainerMain';
import s from './NewsArticle.module.css';

const NewsArticle = ({img, title, text, date}) => {

   return (
      <div>
         {/* <ContantContainerMain> */}

            <div className={`mt40 ${s.mobileContainer}`}>
               <div className={s.newsContainer}>
                  {img && <img className={s.imgMain} src={img} alt="" />}
                  <div className={s.mainTextContainer}>
                     {/* Фильтры, на будущее */}
                     <div className={`mt40 ${s.filterText}`}>{/* {currentNews?.filter?.subject} */} {/* {date} */}</div>

                     <div className={`mt48 pageTitle ${s.mobilMt32}`}>{title}</div>
                     {/* <div className={`mt48 ${s.subtitle}`}>{currentNews.description}</div> */}

                     <div dangerouslySetInnerHTML={{ __html: text }} className={`mt38 text text_admin ${s.textBody}`} />

                     {/* Заголовок фотоотчёта-если есть */}
                     {/* {currentNews.media?.title && <div className={`mt38 ${s.mediaTitle}`}>
                        {currentNews.media?.title}
                     </div>} */}

                  </div>

                  {/* Фотоотчёт-если есть */}
                  {/* {currentNews.media && <div className={s.imgContainer}>
                     {currentNews.media?.images.map((el, i) => <div key={i} className={s.maskContainer}>
                        <div className={s.pattern}></div>
                        <img className={s.img} src={el} alt="" />
                     </div>)}
                  </div>} */}


               </div>
              
            </div>

            

         {/* </ContantContainerMain> */}
      </div>
   )
}
export default NewsArticle;