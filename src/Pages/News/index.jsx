import React, { useEffect, useState } from 'react';
import News from '../../Components/News';
import ContantContainerMain from '../../total/ContantContainerMain';

import s from './NewsPage.module.css';

import API from '../../API/index';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';

const NewsPage = (props) => {

   const [news, setNews] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   const getAndSaveNews = (page, limit, web, dateFrom, dateTo) => {
      return API.getNews(page, limit, web, dateFrom, dateTo)
   }

   useEffect(() => {
      getAndSaveNews(1, 30, true)
         .then(data => setNews(data.news.list))
   }, [])

   const showMore = () => {
      setCurrentPage(currentPage + 1)
      getAndSaveNews(currentPage + 1, 30)
         .then(data => setNews([...news, ...data.news.list]))
   }

   return (
      <div>
         <ContantContainerMain>
            <div className={`mt40 breadcrumbs`}>
               <NavLink to={ROUTER.main} className='breadcrumbsFrom'>Совет депутатов</NavLink>
               <span className={'breadcrumbsTo'}> / Новости</span>
            </div>
            <div className="mt40">
               <News news={news} mobilFullPhoto={true} />
               <div onClick={showMore} className={`btnW ${s.showMore}`}>Загрузить еще</div>
            </div>

         </ContantContainerMain>
      </div>
   )
}
export default NewsPage;