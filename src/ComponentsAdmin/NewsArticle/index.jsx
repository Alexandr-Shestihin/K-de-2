import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';
import ContantContainerMain from '../../total/ContantContainerMain';
import s from './NewsArticle.module.css';
import { useParams } from 'react-router-dom';

import API from '../../API/index';

const NewsArticle = ({img, title, text, date}) => {

   const [news, setNews] = useState([]);
   const [currentNews, setCurrentNews] = useState({})

   useEffect(() => {
      API.getItemNews(33265)
         .then(data => setCurrentNews(data))

      API.getNews(1, 4)
         .then(data => setNews(data))
   }, [])

   return (
      <div>
         <ContantContainerMain>
            {/* <div className={`mt80 breadcrumbs`}>
               <NavLink to={ROUTER.news} className='breadcrumbsFrom'>Новости</NavLink>
               <span className='breadcrumbsTo'> / {currentNews.title}</span>
            </div> */}
            <div className={`mt40 columnContainer ${s.mobileContainer}`}>
               <div className="columnLarge">
                  {img && <img className={s.imgMain} src={img} alt="" />}
                  <div className={s.mainTextContainer}>
                     {/* Фильтры, на будущее */}
                     <div className={`mt40 ${s.filterText}`}>{/* {currentNews?.filter?.subject} */} {/* {date} */}</div>

                     <div className={`mt48 pageTitle ${s.mobilMt32}`}>{title}</div>
                     {/* <div className={`mt48 ${s.subtitle}`}>{currentNews.description}</div> */}

                     <div dangerouslySetInnerHTML={{ __html: text }} className={`mt38 text ${s.textBody}`} />

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
               {/* <div className="ml20 columnSmal mobileNoneContainer">
                  <FamilyYear />
                  <div className="mt40">
                     <TgChannel />
                  </div>
               </div> */}
            </div>

            {/* Последние новости */}
            {/* <section className={s.lastNewsContainer}>
               <div className="mt80 subTitle">Последние новости</div>

               <div className="mt40">
                  <News news={news} mobilFullPhoto={true} />
               </div>

            </section> */}

         </ContantContainerMain>
      </div>
   )
}
export default NewsArticle;