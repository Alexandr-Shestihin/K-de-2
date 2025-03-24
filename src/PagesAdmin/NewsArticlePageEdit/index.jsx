import React, { useState, useEffect, useCallback } from 'react';
import s from './NewsArticlePageEdit.module.css';
import ContantContainerAdmin from "../../total/ContantContainerAdmin";

import ReactQuill from 'react-quill';
import '../../total/quill.snow.css';
import NewsArticle from '../../PagesAdmin/NewsArticle';
import { ROUTER } from '../../config';
import { NavLink, useParams } from 'react-router-dom';
import API from '../../API';
import UploadFileAdminMono from 'total/UploadFileAdminMono';
import CalendarSingle from '../../total/CalendarSingle'
import { maskInputTime, formatDateToEurope, formatDateToUS } from 'utils';

const NewsArticlePageEdit = (props) => {

   const newsId = useParams().id.slice(3);

   const config = {
      content_category_id: 1,
      id: newsId,
      name: '',
      text: '',
      image_preview: null,
      image_preview_url: '',
      published_from_date: '',
      published_from_time: '',
      published_from: '',
      favorite: 0
   }

   const [form, setForm] = useState(() => config);
   const [statusSend, setStatusSend] = useState({})

   useEffect(() => {
      try {
         API.getItemNews(newsId)
            .then(data => {
               setForm(prev => ({
                  ...prev,
                  name: data?.name,
                  text: data?.text,
                  image_preview_url: [data?.image_preview],
                  published_from_date: formatDateToEurope(data?.published_from?.split(' ')[0]),
                  published_from_time: data?.published_from?.split(' ')[1]?.slice(0, 5),
                  favorite: data?.favorite,
               }))
            })
      } catch (error) {
         console.error("Ошибка при загрузке данных:", error);
      }
   }, [newsId])

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

   const saveNews = () => {
      const formData = new FormData();

      const value = formatDateToUS(form.published_from_date) + " " + form.published_from_time + ":00";

      for (let key in form) {
         if (key !== 'image_preview_url' &&
            key !== 'published_from_date' &&
            key !== 'published_from_time' &&
            form[key] !== null) {
            if (key === 'published_from') {
               formData.append(key, value)
            } else
               formData.append(key, form[key]);
         }
      }

      API.postChangeElement(formData)
         .then(response => setStatusSend(response))
   };

   return (
      <div className="mt54">
         <ContantContainerAdmin>
            <div className={`breadcrumbs`}>
               <NavLink to={ROUTER.admin.news} className='breadcrumbsFrom'>Новости</NavLink>
               <span className='breadcrumbsTo'> / {form.name} </span>
            </div>

            {statusSend?.result ? (
               <div className="pageTitle mt160">{statusSend.title}</div>
            ) : <><h1 className="pageTitle mt40">Редактировать новость</h1>
               <div className="text text_admin mt40">
                  <div className='mt40'>
                     <UploadFileAdminMono
                        handler={handler}
                        title={'Загрузите обложку в форматах: jpeg, png'}
                        type={'single'}
                        keyData={'image_preview'}
                     />
                  </div>

                  <div className="rowContainer mt24">
                     <div className="calendarContainer">
                        <CalendarSingle onChange={e => handler(e, "published_from_date")} />
                        <div className="inputContainer">
                           <div className="body-s-400 ml8">Дата</div>
                           <input onChange={() => false} placeholder='DD:MM:YY' className='inputCalendar inputTitle' type="text" value={form.published_from_date} />
                        </div>
                     </div>

                     <div className="inputContainer">
                        <div className="body-s-400 ml8">Время</div>
                        <input placeholder='HH:MM' type="text" value={form.published_from_time} onChange={e => handler(maskInputTime(e.target.value), "published_from_time")} className="inputTitle" />
                     </div>
                  </div>

                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">Заголовок</div>
                     <input placeholder='Не более 120 символов' type="text" value={form.name} onChange={(e) => handler(e.target.value, "name")} className="inputTitle mt24" />
                  </div>

                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">Описание</div>
                     <ReactQuill placeholder='Введите текст новости' theme="snow" value={form.text} onChange={(e) => handler(e, "text")} modules={modules} />
                  </div>

                  <div className="checkboxContainer mt24">
                     <input className='mainInput' checked={form.favorite} onChange={() => handler(form.favorite ? 0 : 1, "favorite")} type="checkbox" name="checkboxMain" id='checkboxMain' />
                     <label htmlFor="checkboxMain">Сделать новость главной</label>
                  </div>

                  <div className="rowContainer mt40">
                     <button className="publishBtn" onClick={saveNews}>Опубликовать</button>
                  </div>
               </div>

               <div className="h3-600 mt40">Предпросмотр:</div>

               <NewsArticle img={form.image_preview_url} title={form.name} text={form.text} /></>}
         </ContantContainerAdmin>
      </div>
   )
}
export default NewsArticlePageEdit;