import React, { useState } from 'react';
import s from './WriteAdministration.module.css';

import ContantContainerMain from '../../total/ContantContainerMain';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';

import API from '../../API/index';

/* import write_administration from '../../assets/img/citizensAppeals/write_administration.png'; */
import inverted_exclamation_mark from '../../assets/icons/inverted_exclamation_mark.svg';
import MessageErr from '../../total/MessageErr';
import MessageSuccusess from '../../total/MessageSuccusess';

import { maskInput } from '../../utils';
import UploadFile from '../../total/UploadFile';

const WriteAdministration = (props) => {

   const config =
   {
      first_name: '',
      middle_name: '',
      last_name: '',
      locality: '',
      street: '',
      house: '',
      building: '',
      flat: '',
      email: '',
      tel: '',
      text: '',
      Simportant: ''
   }


   const [form, setForm] = useState(config);

   const [agree, setAgree] = useState(true);

   const [disable, setDisable] = useState(false);

   const handler = (name, value) => {
      setForm(prev => ({ ...prev, [name]: value }))
   }

   const submit = () => {
      setDisable(true);

      const formData = new FormData();
      for (let key in form) {
         formData.append(key, form[key])
      }

      API.postСomplaint(formData)
         .then(response => {
            for (let key in form) {
               setForm(prev => ({ ...prev, [key]: '' }))
            }
            setSuccusess(true);
            setDisable(false);
         })
         .catch(() => {
            setErr(true);
            setDisable(false);
         })
   }

   const [err, setErr] = useState(false);
   const [succusess, setSuccusess] = useState(false);

   return (
      <div>
         <ContantContainerMain>
            <div className={s.messageContainer}>
               {err && <MessageErr set={setErr} />}
            </div>
            <div className={`mt40 breadcrumbs`}>
               <NavLink to={ROUTER.main} className='breadcrumbsFrom'>Главная</NavLink>
               <span className='breadcrumbsTo'> / Электронная приемная</span>
            </div>
            <div className="mt40 pageTitle">Электронная приемная</div>
            {/* <div className={`mt40 ${s.imgContainer}`}>
               <img src={write_administration} alt="" />
            </div> */}
            {succusess ? <MessageSuccusess /> : <div className="mt40 text">
               <div className="pageSubtitle">Важно:</div>
               <ul className="mt38">
                  <li>
                     В соответствии с Федеральным законом от 02.05.2006 № 59-ФЗ «О порядке рассмотрения обращений граждан Российской Федерации» и законом Московской области от 05.10.2006 № 164/2006-03 «О рассмотрении обращений граждан» вопросы без указания личных данных считаются анонимными и будут удалены.
                  </li>
                  <li>
                     Не будут рассматриваться обращения, содержащие нецензурные либо оскорбительные выражения, угрозы жизни, здоровью и имуществу должностного лица и членов его семьи, а также скрытую и явную рекламу.
                  </li>
                  <li>
                     Конфиденциальность информации о персональных данных граждан, задавших вопрос в электронном виде, гарантируется Администрацией.
                  </li>
               </ul>

               <div>
                  <div className="mt40">
                     <div className={s.flexContainer}>
                        <div className={s.inputContainer}>
                           <div className={`${s.titleInput}`}>Фамилия</div>
                           <input value={form['first_name']} onChange={(e) => handler('first_name', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                        </div>
                        <div className={s.inputContainer}>
                           <div className={`${s.titleInput}`}>Имя</div>
                           <input value={form['middle_name']} onChange={(e) => handler('middle_name', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                        </div>
                     </div>
                     <div className={`mt32 ${s.flexContainer}`}>
                        <div className={s.inputContainer}>
                           <div className={`${s.titleInput}`}>Отчество</div>
                           <input value={form['last_name']} onChange={(e) => handler('last_name', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                        </div>
                     </div>
                  </div>
                  <div className={`mt48 ${s.line}`}></div>
                  <div className={`mt48 ${s.flexContainer}`}>
                     <div className={s.inputContainer}>
                        <div className={`${s.titleInput}`}>Населённый пункт</div>
                        <input value={form['locality']} onChange={(e) => handler('locality', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                     </div>
                     <div className={s.inputContainer}>
                        <div className={`${s.titleInput}`}>Улица</div>
                        <input value={form['street']} onChange={(e) => handler('street', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                     </div>
                  </div>
                  <div className={`mt32 ${s.flexContainer}`}>
                     <div className={s.inputContainer}>
                        <div className={`${s.titleInput}`}>Дом</div>
                        <input value={form['house']} onChange={(e) => handler('house', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                     </div>
                     <div className={s.flexInputMin}>
                        <div className={`${s.inputContainer}`}>
                           <div className={`${s.titleInput}`}>Корпус</div>
                           <input value={form['building']} onChange={(e) => handler('building', e.target.value)} type="text" className={`mt8 ${s.input}  ${s.input_min}`} />
                        </div>
                        <div className={`ml16 ${s.inputContainer}`}>
                           <div className={`${s.titleInput}`}>Квартира</div>
                           <input value={form['flat']} onChange={(e) => handler('flat', e.target.value)} type="text" className={`mt8 ${s.input}  ${s.input_min}`} />
                        </div>
                     </div>
                  </div>
                  <div className={`mt48 ${s.line}`}></div>
                  <div className={`mt48 ${s.flexContainer}`}>
                     <div className={s.inputContainer}>
                        <div className={`${s.titleInput}`}>Электронная почта</div>
                        <input value={form['email']} onChange={(e) => handler('email', e.target.value)} type="text" className={`mt8 ${s.input}`} />
                     </div>
                     <div className={s.inputContainer}>
                        <div className={`${s.titleInput}`}>Телефон</div>
                        <input value={form['tel']} onChange={(e) => handler('tel', maskInput(e.target.value, "+7 (000) 000-00-00"))} placeholder='+7 (___) ___-__-__' type="text" className={`mt8 ${s.input}`} />
                     </div>
                  </div>
                  <div className={`mt48 ${s.titleInput}`}>Текст обращения</div>
                  <textarea value={form['text']} onChange={(e) => handler('text', e.target.value)} placeholder='Введите здесь Ваше обращение, при необходимости прикрепите файлы' className={`mt8 ${s.textarea}`} name="" id=""></textarea>
                  <input onChange={(e) => handler('Simportant', e.target.value)} type="text" className={s.important} />

                  <div className="mt48">
                     <UploadFile handler={handler} />
                  </div>

                  <div className={`mt48 ${s.description}`}>Внимание! Максимальное количество файлов 7, общий объём приложенных файлов не должен превышать - 20 Мб
                     <br />Допустимые форматы: jpg, png, gif, bmp, doc, docx, xls, xlsx, pdf, txt, zip, rar, 7z</div>
                  <div className="mt48 flexContainer">
                     <input onChange={() => setAgree(!agree)} value={agree} name='agree' id='agree' type="checkbox" />
                     <label htmlFor="agree" className={`ml16 ${s.description}`}>Я даю согласие на использование персональных данных</label>
                  </div>
                  <button onClick={submit} disabled={disable || agree} style={{ background: disable && 'grey' }} className={`mt48 btnY ${s.submit}`}>Отправить</button>
                  <div className={`mt80 borderMain flexContainer ${s.description} ${s.descriptionContainer}`}>
                     <img src={inverted_exclamation_mark} alt="" />
                     <span>В соответствии с Федеральным законом от 02.05.2006 № 59-ФЗ «О порядке рассмотрения обращений граждан Российской Федерации» и законом Московской области от 05.10.2006 № 164/2006-03 «О рассмотрении обращений граждан» вопросы без указания личных данных считаются анонимными и будут удалены. Не будут рассматриваться обращения, содержащие нецензурные либо оскорбительные выражения, угрозы жизни, здоровью и имуществу должностного лица и членов его семьи, а также скрытую и явную рекламу. Конфиденциальность информации о персональных данных граждан, задавших вопрос в электронном виде, гарантируется Администрацией.</span>
                  </div>
               </div>
            </div>}
         </ContantContainerMain>
      </div>
   )
}
export default WriteAdministration;