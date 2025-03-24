import { useState, Children, cloneElement, useEffect } from 'react';
import s from './visuallyImpaired.module.css';
import './visuallyImpairedStyle.css';

const VisuallyImpaired = ({ children }) => {

   /* Версия для слабовидящих */

   const config = {
      Active: false,
      FontSize: 'normal',
      BG: 'normal',
      Img: 'blackWhite',
      Voice: false
   }

   const checkInitial = () => {
      const newConfig = { ...config }

      for (const key in config) {
         let value = localStorage.getItem(`VisuallyImpaired${key}`)
         if (value !== String(newConfig[key]) && isNaN(value)) {
            value = value === "false" ? false : value
            value = value === "true" ? true : value
            newConfig[key] = value
         }
      }
      return newConfig
   }

   const [VI, setVI] = useState(() => checkInitial())

   const handler = (name, value) => {
      localStorage.setItem(`VisuallyImpaired${name}`, value)
      setVI(prev => ({ ...prev, [name]: value }))
   }

   /* Voice */
   const getVoice = (e) => {
      const value=`${e.target.attributes.alt?.value || e.target.innerText}`
      const result = new SpeechSynthesisUtterance(value)
      window.speechSynthesis.speak(result);
   }

   const VoiceChange = (e) => {
      handler("Voice", !!e.target.id)
      /* !!e.target.id || window.speechSynthesis.pause() */
      e.stopPropagation()
   }
   const visuallyImpairedStyle = `${VI.Active && "active"} ${VI.FontSize} ${VI.BG} ${VI.Img}`

   /* power off */
   useEffect(() => {
      localStorage.setItem("setVisuallyImpairedActive", VI.Active)
   }, [VI.Active])


   const shutdownReset=()=>{
      for(const key in config){
          localStorage.setItem(`VisuallyImpaired${key}`, config[key])
      }
      handler("Active", false)
   }

   return (
      <div onClick={(e) => VI.Voice && getVoice(e)}>
         {VI.Active && <div className={s.row}>
            <div className={s.container} onClick={(e) => handler("FontSize", e.target.id)}>
               <div className={s.text}>Размер шрифта</div>
               <div className={s.rowBtn}>
                  <button className={`${VI.FontSize === "normal" && s.activeBtn}`} id="normal" alt="выбран нормальный размер шрифта">A</button>
                  <button className={`${VI.FontSize === "middle" && s.activeBtn} ${s.middle}`} id="middle" alt="выбран средний размер шрифта">A</button>
                  <button className={`${VI.FontSize === "large" && s.activeBtn} ${s.large}`} id="large" alt="выбран крупный размер шрифта">A</button>
               </div>
            </div>

            <div className={s.container} onClick={(e) => handler("BG", e.target.id)}>
               <div className={s.text}>Цвета сайта</div>
               <div className={s.rowBtn}>
                  <button className={s.white} id="white" alt="цвет сайта чёрным по белому">Ц</button>
                  <button className={s.black} id="black" alt="цвет сайта белым по чёрному">Ц</button>
                  <button className={s.cian} id="cian" alt="цвет сайта тёмно-синим по голубому">Ц</button>
                  <button className={s.yellow} id="yellow" alt="цвет сайта коричневым по бежевому">Ц</button>
                  <button className={s.brown} id="brown" alt="цвет сайта зелёным по тёмно-коричневому">Ц</button>
               </div>
            </div>

            <div className={s.container} onClick={(e) => handler("Img", e.target.id)}>
               <div className={s.text}>Изображненния</div>
               <div className={s.rowBtn}>
                  <button className={`${VI.Img === "imagesOn" && s.activeBtn} ${s.imageBtn} ${s.imagesOn}`} id="imagesOn" alt="изображения включены"></button>
                  <button className={`${VI.Img === "imagesOff" && s.activeBtn} ${s.imageBtn} ${s.imagesOff}`} id="imagesOff" alt="изображения выключены"></button>
                  <button className={`${VI.Img === "blackWhite" && s.activeBtn} ${s.imageBtn} ${s.blackWhite}`} id="blackWhite" alt="изображения чёрно-белые"></button>
               </div>
            </div>

            <div className={s.container} onClick={VoiceChange}>
               <div className={s.text}>Синтез речи</div>
               <div className={s.rowBtn}>
                  <button className={`${VI.Voice === false && s.activeBtn} ${s.imageBtn} ${s.voiceOff}`} id="" alt="синтез речи выключён"></button>
                  <button className={`${VI.Voice === true && s.activeBtn} ${s.imageBtn} ${s.voiceOn}`} id="true" alt="синтез речи включён"></button>
               </div>
            </div>

            <div className={s.container}>
               <div className={s.rowBtn}>
                  <button onClick={shutdownReset}>Обычная версия</button>
               </div>
            </div>

         </div>}
         <span className={visuallyImpairedStyle}>
            {Children.map(children, (child) => cloneElement(child, {
               setVisuallyImpairedActive: (value) => handler("Active", value),
               visuallyImpairedActive: VI.Active,
            }))}
         </span>
      </div>
   )
}
export default VisuallyImpaired;