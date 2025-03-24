import React, { useEffect, useState } from 'react';
import ContantContainerMain from '../../total/ContantContainerMain';
import s from './Main.module.css';

import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';

import API from '../../API';

/* Компоненты */
import NewsLong from '../../Components/NewsLong';

/* Баннеры */
import GovernmentServices from '../../BannersComopnents/GovernmentServices';
import GovernmentServicesLarge from '../../BannersComopnents/GovernmentServicesLarge';
/* import SVO from '../../BannersComopnents/svo'; */
/* import ChannelTG from '../../BannersComopnents/ChannelTG'; */

import MainNews from '../../Components/MainNews';
import DocumentContainerDownloadDouble from 'Components/DocumentContainerDownloadDouble';

const Main = (props) => {

   /* Запрашиваем новости */
   const [news, setNews] = useState([]);
   const [newsFavorite, setNewsFavorite] = useState([]);

   const [documentations, setDocumentations] = useState({});

   useEffect(() => {
      API.getNews(1, 4, "", 0)
         .then(data => setNews(data?.news?.list))

      API.getNews(1, 4, "", 1)
         .then(data => setNewsFavorite(data?.news?.list))

      API.getDocumentations(1, 5).then((data) =>
         setDocumentations(data)
      );
   }, [])

   return (
      <div>
         <ContantContainerMain>

            <section className={`mt40 ${s.lastNewsContainer}`}>

               {newsFavorite && <MainNews mainNews={newsFavorite[0]} />}

               <div className={`${s.newsContainer} ${s.mt64Mobile}`}>
                  <div className="subTitle">Последние новости</div>
                  <div className="bannerArrowContainer mt24">
                     <NewsLong btnText={'Все новости'} news={news} />
                  </div>
                  <NavLink to={ROUTER.news} className={`mt24 btnW ${s.showMore}`}>Все новости</NavLink>
               </div>
            </section>

            <div className={`mt80 ${s.bannersContainer}`}>
               <div className={`${s.governmentServicesLargeBanner}`}>
                  <GovernmentServicesLarge />
               </div>

               <div className={s.governmentServicesBanner}>
                  <GovernmentServices />
               </div>
            </div>


            <section className={s.programAdministratorContainer}>
               <div className="mt80 subTitle">Последние документы</div>
               <div className="mt40 columnContainer">
                  <div className={`${s.mobilBannerRow}`}>
                     {documentations?.document?.list?.map((el) => (
                        <div key={el.id} className="mt32">
                           <DocumentContainerDownloadDouble
                              title={el.name}
                              text={el.text}
                              value={el.property?.document?.value}
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </section>

         </ContantContainerMain>

      </div>
   )
}
export default Main;