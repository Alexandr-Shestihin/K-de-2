import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';
import ContantContainerMain from '../../total/ContantContainerMain';
import s from './NewsArticle.module.css';
import { useParams } from 'react-router-dom';

import API from '../../API/index';

import News from '../../Components/News';

const NewsArticle = (props) => {

   const newsId = useParams().id.slice(3);

   const [news, setNews] = useState([]);
   const [currentNews, setCurrentNews] = useState({})

   useEffect(() => {
      API.getItemNews(newsId)
         .then(data => setCurrentNews(data))

      API.getNews(1, 4, true)
         .then(data => setNews(data.news.list))
   }, [newsId])

   /* Удапляет пустые тэги <p>&nbsp</p> */
   const clearHTML = (text) => {
      return text?.replace(/<p>(\s|(&nbsp))<\/p>/gmi, '')
   }

   return (
      <div>
         <ContantContainerMain>
            <div className={`mt80 breadcrumbs`}>
               <NavLink to={ROUTER.news} className='breadcrumbsFrom'>Новости</NavLink>
               <span className='breadcrumbsTo'> / {currentNews.title}</span>
            </div>
            <div className={`mt40 columnContainer ${s.mobileContainer}`}>
               <div className="columnLarge">
                  <div className={s.mainTextContainer}>
                  {currentNews.image_detail && <img className={s.imgMain} src={currentNews.image_detail} alt="" />}
                     {/* Фильтры, на будущее */}
                     <div className={`mt40 ${s.filterText}`}>{currentNews?.filter?.subject} {currentNews?.dateTime}</div>

                     <div className={`mt48 pageTitle ${s.mobilMt32}`}>{currentNews.title}</div>
                     <div className={`mt48 ${s.subtitle}`}>{currentNews.description}</div>

                     {/* Цитаты, если есть */}
                     {/* {currentNews.citation?.textBody && <div className={`mt38 ${s.citationConatiner}`}>
                        <div className={`${s.citationTextBody} borderLeftMain`}>
                           «{currentNews.citation?.textBody}»
                        </div>
                        <div className={`mt20 ${s.authorInfoContainer}`}>
                           <div className={s.author}>{currentNews.citation?.author}</div>
                           <div className={s.jobTitle}>{currentNews.citation?.jobTitle}</div>
                        </div>
                     </div>} */}

                     <div dangerouslySetInnerHTML={{ __html: clearHTML(currentNews.text) }} className={`mt38 text ${s.textBody}`} />

                     {/* Заголовок фотоотчёта-если есть */}
                     {currentNews.media?.title && <div className={`mt38 ${s.mediaTitle}`}>
                        {currentNews.media?.title}
                     </div>}

                  </div>

                  {/* Фотоотчёт-если есть */}
                  {currentNews.media && <div className={s.imgContainer}>
                     {currentNews.media?.images.map((el, i) => <div key={i} className={s.maskContainer}>
                        <div className={s.pattern}></div>
                        <img className={s.img} src={el} alt="" />
                     </div>)}
                  </div>}


               </div>
               <div className="ml20 columnSmal mobileNoneContainer">
                  
                  
               </div>
            </div>

            {/* Последние новости */}
            <section className={s.lastNewsContainer}>
               <div className="mt80 subTitle">Последние новости</div>

               <div className="mt40">
                  <News news={news} mobilFullPhoto={true} />
               </div>

            </section>

         </ContantContainerMain>
      </div>
   )
}
export default NewsArticle;