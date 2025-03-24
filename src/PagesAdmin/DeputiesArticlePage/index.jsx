import React, { useState, useEffect, useCallback } from 'react';
import ContantContainerAdmin from '../../total/ContantContainerAdmin';
import s from './DeputiesArticlePage.module.css';

import ReactQuill from 'react-quill';
import '../../total/quill.snow.css';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';
import API from '../../API';
import UploadFileAdminMono from 'total/UploadFileAdminMono';
import Deputates from 'Components/Deputates';
import ReactSelect from 'ComponentsAdmin/React-select';
import { useRequireAccessLevel, maskInput } from 'utils';

const DeputiesArticlePage = ({ level }) => {

   const config = {
      content_category_id: 2,
      name: '',
      text: '',
      description: '',
      phone: '',
      image_preview: null,
      image_preview_url: '',
      phone: '',
      email: '',
      party: ''
   }

   const [form, setForm] = useState(() => config);
   const [party, setParty] = useState([]);
   const [statusSend, setStatusSend] = useState({});

   const [reactSelectValue, setReactSelectValue] = useState();

   useEffect(() => {
      handler(reactSelectValue, "party")
   }, [reactSelectValue])

   useEffect(() => {
      try {
         API.getParty()
            .then(data => setParty(data))
      } catch (error) {
         console.error("Ошибка при загрузке данных:", error);
      }
   }, []);

   const handler = useCallback((value, key) => {
      setForm(prevNews => ({ ...prevNews, [key]: value }));
   }, [])

   useEffect(() => {
      if (form.image_preview instanceof File || form.image_preview instanceof Blob) {
         try {
            const url = window.URL.createObjectURL(form.image_preview);
            handler(url, "image_preview_url");
         } catch (error) {
            console.error("Ошибка при создании URL:", error);
         }
      } else {
         // Если image_preview - это URL (строка), то просто используем его
         handler(form.image_preview, "image_preview_url");
      }
   }, [form.image_preview]);


   const modules = {
      toolbar: [
         [{ 'header': [1, 2, false] }],
         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
         ['clean']
      ],
   }

   const saveDeputat = () => {
      const formData = new FormData();

      for (let key in form) {
         if (key !== 'image_preview_url' && form[key] !== null) {
            formData.append(key, form[key]);
         }
      }

      API.postAddElement(formData)
         .then(response => setStatusSend(response))
   };

   const accessLevel = useRequireAccessLevel(level)
   if (!accessLevel) {
      return null;
   }

   return (
      <div className="mt54">
         <ContantContainerAdmin>
            <div className={`breadcrumbs`}>
               <NavLink to={ROUTER.admin.deputies} className='breadcrumbsFrom'>Депутаты</NavLink>
               <span className='breadcrumbsTo'> / Добавить депутата </span>
            </div>
            {statusSend?.result ? (
               <div className="pageTitle mt160">{statusSend.title}</div>
            ) : <><h1 className="pageTitle mt40">Депутат</h1>
               <div className="text text_admin mt40">
                  <div className='mt40'>
                     <UploadFileAdminMono
                        handler={handler}
                        title={'Загрузите обложку в форматах: jpeg, png'}
                        type={'single'}
                        keyData={'image_preview'}
                     />
                  </div>

                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">ФИО</div>
                     <input placeholder='ФИО' type="text" value={form.name} onChange={(e) => handler(e.target.value, "name")} className="inputTitle mt24" />
                  </div>
                  <div className={s.inputContainerRow}>
                     <div className={`inputContainer mt24`}>
                        <div className="body-s-400 ml8">Телефон</div>
                        <input placeholder='Телефон' type="text" value={form.phone} onChange={(e) => handler(maskInput(e.target.value, "+7 (000) 000-00-00"), "phone")} className="inputTitle mt24" />
                     </div>
                     <div className={`inputContainer mt24`}>
                        <div className="body-s-400 ml8">Почта</div>
                        <input placeholder='Почта' type="mail" value={form.email} onChange={(e) => handler(e.target.value, "email")} className="inputTitle mt24" />
                     </div>
                  </div>

                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">Описание</div>
                     <ReactQuill
                        placeholder='Текст о депутате'
                        theme="snow"
                        value={form.description || ''}
                        onChange={(e) => handler(e, "description")}
                        modules={modules}
                     />
                  </div>

                  <div className="inputContainer mt24">
                     <div className="body-s-400 ml8">Партия</div>
                     <ReactSelect
                        name='selectName'
                        valuesOptions={party}//Сюда передать данные списка выбора
                        isMulti={false}//множественный выбор
                        placeholder={'Партия'}
                        initialValue={form.party}//Выбранное/ые данные по дефолту. Если isMulti true, то передавать массив!
                        onChangeValue={setReactSelectValue}//функция, возвращающая выбранное значение
                        labelName={'name'}//Какие данные отображать в label (видимые пользователем)
                        valueName={'id'}//Какие данные отображать в value (видимые только нам)
                        isSearchable={true}//Тут можно отключить поиск
                     />
                  </div>
               </div>

               <div className="pageTitle mt40">Предпросмотр:</div>

               <Deputates
                  img={form.image_preview_url}
                  name={form.name}
                  tel={form?.phone || ''}
                  email={form?.email || ''}
                  /* vkLink={form?.social["vk.com"] || ''}
                  okLink={form?.social["ok.ru"] || ''} */
                  text={form?.description}
                  description={form?.description}
                  partyId={form.party}
               /></>}

            <div className="rowContainer mt40">
               <button className="publishBtn" onClick={saveDeputat}>Опубликовать</button>
            </div>
         </ContantContainerAdmin>
      </div>
   )
}
export default DeputiesArticlePage;