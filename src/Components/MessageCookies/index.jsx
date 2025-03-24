import React, { useEffect, useState } from 'react';
import s from './MessageCookies.module.css';
import ContantContainerMain from '../../total/ContantContainerMain';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../../utils';

const MessageCookies = (props) => {

   const [storedCookies, setCookies] = useLocalStorage('messageCookies', false)

   const [active, setActive] = useState(false)

   useEffect(() => {
      let timeoutId

      if (!active && !storedCookies) {
         timeoutId = setTimeout(() => {
            setActive(true)
         }, 10000)
      }

      return () => clearTimeout(timeoutId)
   }, [])

   const handler=()=>{
      setActive(false)
      setCookies(true)
   }

   return (
      <div>
         <div
            className={active ? `${s.modal} ${s.active}` : s.modal}
         >
            <div
               className={active ? `${s.modal__content} ${s.active}` : s.modal__content}
               onClick={e => e.stopPropagation()}
            >
               <ContantContainerMain>
                  <div className={s.flexContainer}>
                     <div className={s.text}>
                        Данный веб-сайт использует cookie-файлы в целях предоставления вам лучшего пользовательского опыта. Продолжая использовать данный сайт, вы соглашаетесь с использованием нами cookie-файлов. Для получения дополнительной информации см. <NavLink className={s.link} to={ROUTER.politicsCookie}>Политика Cookie</NavLink>.
                     </div>
                     <button onClick={handler} className={s.btn}>Принять</button>
                  </div>
               </ContantContainerMain>
            </div>
         </div>
      </div>
   )
}
export default MessageCookies;