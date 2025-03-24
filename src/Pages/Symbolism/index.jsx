import React from 'react';
import s from './Symbolism.module.css';
import ContantContainerMain from '../../total/ContantContainerMain';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';
import cityCoatArms from '../../assets/img/khimkiDistrict/Symbolism/gerb.png';
import flag from '../../assets/img/khimkiDistrict/Symbolism/flag.png';
import Logo from '../../assets/img/khimkiDistrict/Symbolism/logo.png';
import DocumentContainerDownload from '../../Components/DocumentContainerDownload';
import gimn from '../../assets/audio/gimn.mp3';

import ustav from '../../assets/documents/khimkiDistrict/ustav_himki.pdf';

const Symbolism = (props) => {

   return (
      <div>
         <ContantContainerMain>
            <div className={`mt40 breadcrumbs`}>
               <NavLink to={ROUTER.main} className='breadcrumbsFrom'>Совет депутатов</NavLink>
               <span className='breadcrumbsTo'> / Устав и символика</span>
            </div>
            <div className='text'>
               <div className={`mt40 ${s.subtitle}`}>Устав</div>
               <div className={`mt40`}>Совет депутатов городского округа Химки Московской области
                  от имени граждан, проживающих на территории городского округа Химки Московской области, исходя из необходимости защиты и сохранения конституционных прав и свобод граждан и создания для них подобающих условий жизни, отдыха и трудовой деятельности принимает настоящий Устав городского округа Химки Московской области, который является основополагающим муниципальным нормативным правовым актом среди всех остальных актов, принимаемых органами местного самоуправления городского округа.</div>
               <div className={`mt40`}>
                  <DocumentContainerDownload document={ustav} documentName={'ustav-gorodskogo-okruga-khimki-moskovskoy-oblasti'} title='УСТАВ_окончательный_31.08.16.pdf' text='549.81 KB' date="20.12.2023" />
               </div>
               <div className={`mt80 ${s.subtitle}`}>Символика</div>
               <div className="mt40">
                  <div className={s.flexContainer}>
                     <div className={s.imgContainer}>
                        <img src={cityCoatArms} alt="" />
                     </div>
                     <div className={s.textContainer}>
                        <div className={`${s.textBodyCard}`}>
                           <div className={s.titleCard}>Герб</div>
                           <div className="mt14">
                              Звёзды и кентавр символизируют основные предприятия города, связанные с производством и разработкой
                              космических аппаратов: НПО «Энергомаш», НПО им. Лавочкина, МКБ «Факел».
                              Герб утверждён решением Совета депутатов Химкинского района от 5 февраля 1999 года (№ 19/2).
                              Внесён в Государственный геральдический регистр под № 425.
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mt40">
                  <div className={s.flexContainer}>
                     <div className={s.imgContainer}>
                        <img src={flag} alt="" />
                     </div>
                     <div className={s.textContainer}>
                        <div className={`${s.textBodyCard}`}>
                           <div className={s.titleCard}>Флаг</div>
                           <div className="mt14">
                              Кентавр символизирует единение разума человека и мощи природных сил, стремящихся к познанию неведомого и преодолению преград. Чёрный цвет поля соответствует в геральдике цвету космоса. Жёлтый (золотой) — это цвет солнца, символ разума, справедливости, богатства и великодушия, знак земного и небесного величия. Флаг утверждён 2 сентября 2004 года.
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mt40">
                  <div className={s.flexContainer}>
                     <div className={s.imgContainer}>
                        <img src={Logo} alt="" />
                     </div>
                     <div className={s.textContainer}>
                        <div className={`${s.textBodyCard}`}>
                           <div className={s.titleCard}>Логотип</div>
                           <div className="mt14">
                              Химки – это территория новых возможностей. Здесь жизнь постоянно меняется к лучшему, здесь думают о людях и модернизируют инфраструктуру так, чтобы жителям было удобно и комфортно.
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt80">
                  <div className="pageTitle">Гимн городского округа Химки</div>
                  <div className="mt40">
                     <audio className={s.gimn} src={gimn} controls />
                  </div>

                  <div className="mt40 text">
                     <div>Химки навеки в истории нашей,</div>
                     <div>Память о подвиге нам дорога-</div>
                     <div>Слава защитникам, насмерть стоявшим,</div>
                     <div>И сокрушившим врага.</div>
                     <br />
                     <div>Припев:</div>
                     <div>Химки - родной и любимый наш город,</div>
                     <div>Славу тебе мы поем!</div>
                     <div>Химки сегодня по- прежнему молод,</div>
                     <div>Город, в котором живем!</div>
                     <br />
                     <div>В Химках проложена в космос дорога,</div>
                     <div>Город науки и город труда,</div>
                     <div>Для нашей Отчизны сделал ты много,</div>
                     <div>В наших сердцах навсегда!</div>
                     <br />
                     <div>В Химках проложена в космос дорога,</div>
                     <div>Город науки и город труда,</div>
                     <div>Для нашей Отчизны сделал ты много,</div>
                     <div>В наших сердцах навсегда!</div>
                     <br />
                     <div>С каждой минутой мощней и красивей</div>
                     <div>Города нашего славный полет!</div>
                     <div>Вместе с народом, вместе с Россией</div>
                     <div>Химки к победам идет!</div>
                  </div>

                  <div className="description mt32">
                     Слова А. Б. Моргунова, музыка Д. А. Дронова
                  </div>
               </div>
            </div>
         </ContantContainerMain>
      </div>
   )
}
export default Symbolism;