import React, { useEffect, useState } from 'react';
import s from './Deputates.module.css';

import vk from '../../assets/icons/vk.svg';
import ok from '../../assets/icons/ok.svg';

import KPRFlogo from "../../assets/img/parties/KPRF.svg";
import yedinayaRossiyalogo from "../../assets/img/parties/yedinayaRossiya.svg";
import spravedlivayaRossiyalogo from "../../assets/img/parties/spravedlivayaRossiya.svg";
import API from 'API';

const Deputates = ({ img, name, tel, email, vkLink, okLink, text, partyId, description }) => {

   const [party, setParty] = useState({})

   useEffect(() => {
      API.getParty()
      .then(response => {
         setParty(response.find(el=>el.id==partyId))
      })
   }, [partyId])

   return (
      <div className={s.container}>
         <div className={s.imgContainer}>
            <img src={img} alt="" />
         </div>
         <div className={s.textContainer}>
            <div className={s.name}>{name}</div>
            {tel && <div className={s.contact}>{tel}</div>}
            {email && <div className={s.contact}>{email}</div>}
            {(vkLink || okLink) && <div className={s.socialLink}>
               {vkLink && <a href={vkLink} target='_blank'><div className={s.imgSocialContainer}><img src={vk} alt="" /></div></a>}
               {okLink && <a href={okLink} target='_blank'><div className={s.imgSocialContainer}><img src={ok} alt="" /></div></a>}
            </div>}
            <div className={s.text} dangerouslySetInnerHTML={{ __html: text }} />
            {party &&
               <div className={s.partyContainer}>
                  <div className={s.partyName}>Член партии {party.name}</div>
                  <div className={s.partyLogo}><img src={party.src} alt="" /></div>
               </div>}
         </div>
      </div>
   )
}
export default Deputates;