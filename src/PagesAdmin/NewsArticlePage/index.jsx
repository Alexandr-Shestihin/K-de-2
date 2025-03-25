import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import s from './NewsArticlePage.module.css';
import ContantContainerAdmin from "../../total/ContantContainerAdmin";

import ReactQuill from 'react-quill';
import '../../total/quill.snow.css';
import NewsArticle from '../../PagesAdmin/NewsArticle';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';
import API from '../../API';
import UploadFileAdminMono from 'total/UploadFileAdminMono';
import CalendarSingle from '../../total/CalendarSingle'
import { maskInputTime, formatDateToUS } from 'utils';

/* React-hook-form */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from 'ComponentsAdmin/Input';

const NewsArticlePage = (props) => {

   const [statusSend, setStatusSend] = useState({})

   const modules = {
      toolbar: [
         [{ 'header': [1, 2, false] }],
         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
         ['clean']
      ],
   }

   const saveNews = () => {
      const form = getValues();
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

      API.postAddElement(formData)
         .then(response => console.log("Успешно отправлено", response))
   };

   /* React-hook-form */
   const schema = yup.object({
      name: yup.string().typeError('Должно быть строкой')//typeError выводит ошибку, когда не строка
         .matches(
            /^[a-zA-Z0-9]+$/,
            'Недопустимые символы'
         )
         .min(2, 'Заголовок должен быть минимум 2 символа')
         .max(120, 'Не более 120 символов')
         .required('Обязательно'),
      text: yup.string().typeError('Должно быть строкой')//typeError выводит ошибку, когда не строка
         .min(2, 'Заголовок должен быть минимум 2 символа')
         .max(120, 'Не более 120 символов')
         .required('Обязательно'),
   }).required();

   const {
      watch,
      register,
      formState: {
         errors,
         isValid,
         values,
      },
      handleSubmit,
      reset,
      setValue,
      getValues,
   } = useForm({
      mode: 'all',
      resolver: yupResolver(schema),
      defaultValues: {
         content_category_id: 1,
         name: '',
         text: '',
         image_preview: null,
         image_preview_url: '',
         published_from_date: '',
         published_from_time: '',
         published_from: '',
         favorite: 0
      }
   });

   const values1 = watch("image_preview_url")

   const handleImageChange = useCallback((file) => {
      handler(file, 'image_preview'); // Сохраняем File для отправки

      if (file) {
         const url = window.URL.createObjectURL(file);
         handler('image_preview_url', url)
      } else {
         handler('image_preview_url', '')
      }
   }, [setValue]);

   useEffect(() => {
      return () => {
         // Отзываем URL при размонтировании
         const imageUrl = getValues('image_preview_url');
         if (imageUrl) {
            window.URL.revokeObjectURL(imageUrl);
         }
      };
   }, []);

   const handler = useCallback((file, name) => {
      setValue(name, file);
   }, [setValue]);

   const MemoizedNewsArticle = useMemo(
      () => {
         console.log(values?.image_preview_url)
         return (
            <NewsArticle
               img={getValues("image_preview_url")}
               title={getValues("name")}
               text={getValues("text")}
            />
         )
      },
      [values1]
   )

   const onSubmit = (data) => {
      saveNews();
      reset();
      console.log(data);
   };

   console.log(values)

   return (
      <div className="mt54">
         <ContantContainerAdmin>
            <div className={`breadcrumbs`}>
               <NavLink to={ROUTER.admin.news} className='breadcrumbsFrom'>Новости</NavLink>
               <span className='breadcrumbsTo'> / Добавить новость </span>
            </div>
            {statusSend?.result ? (
               <div className="pageTitle mt160">{statusSend.title}</div>
            ) : <><h1 className="pageTitle mt40">Новость</h1>
               <form onSubmit={handleSubmit(onSubmit)} className="text text_admin mt40">
                  <div className='mt40'>
                     <UploadFileAdminMono
                        handler={handleImageChange}
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
                           <input
                              onChange={() => false}
                              placeholder='DD:MM:YY'
                              className='inputCalendar inputTitle'
                              type="text"
                              {...register("published_from_date")}
                           />
                        </div>
                     </div>

                     <div className="inputContainer">
                        <div className="body-s-400 ml8">Время</div>
                        <input
                           placeholder='HH:MM'
                           type="text"
                           {...register("published_from_time")}
                           onChange={e => handler(maskInputTime(e.target.value), "published_from_time")}
                           className="inputTitle"
                        />
                     </div>
                  </div>

                  <div className={`mt24`}>
                     <Input
                        type="text"
                        name='name'
                        errors={errors}
                        register={register}
                        label={'Заголовок'}
                        placeholder={'Не более 120 символов'}
                        className={'inputTitle mt24'}
                        /* value={form.name} */
                        onChange={(e) => handler(e.target.value, "name")}
                     />
                  </div>

                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">Описание</div>
                     <ReactQuill
                        placeholder='Введите текст новости'
                        theme="snow"
                        onChange={(e) => handler(e, "text")}
                        modules={modules}
                     />
                  </div>

                  <div className="checkboxContainer mt24">
                     <input
                        className='mainInput'
                     /* onChange={() => handler(form.favorite ? 0 : 1, "favorite")} */ type="checkbox" name="checkboxMain" id='checkboxMain' {...register("favorite")} />
                     <label htmlFor="checkboxMain">Сделать новость главной</label>
                  </div>

                  <div className="rowContainer mt40">
                     <button className="publishBtn" onClick={onSubmit}>Опубликовать</button>
                  </div>
               </form>

               <div className="pageTitle mt40">Предпросмотр:</div>

               {MemoizedNewsArticle}
            </>}
         </ContantContainerAdmin>
      </div>
   )
}
export default NewsArticlePage;