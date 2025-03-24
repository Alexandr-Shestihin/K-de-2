import React, { useCallback, useEffect, useState } from "react";
import s from "./NewsPageList.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import ContantContainerAdmin from "../../total/ContantContainerAdmin";
import PaginationComponent from "../../total/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { news, updatePublished, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } from 'store/slice/news';
import ItemComponentNews from "ComponentsAdmin/ItemComponentNews";
import DropDownMenu from "ComponentsAdmin/DropDownMenu";
import SearchInput from "ComponentsAdmin/SearchInput/SearchInput";

/* React-hook-form */
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const NewsPageList = () => {

   const dispatch = useDispatch();
   const newsData = useSelector(state => state.news);
   const [checkboxAll, setCheckboxAll] = useState(false);
   const [checkbox, setCheckbox] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [limit] = useState(10);
   const [isReloading, setIsReloading] = useState(false);  //  Состояние загрузки

   // Функция загрузки данных
   const loadNews = useCallback(async () => {
      setIsReloading(true);
      try {
         const data = await API.getNews(currentPage, limit, "admin"); // Получаем данные с сервера
         dispatch(news(data)); // Обновляем состояние Redux
      } catch (error) {
         console.error('Ошибка при загрузке новостей:', error);
         //  Обработка ошибки
      } finally {
         setIsReloading(false);
      }
   }, [currentPage, limit, dispatch]);

   // Эффект для загрузки данных при монтировании компонента и изменении страницы
   useEffect(() => {
      loadNews();
   }, [loadNews]);

   const UpdateCheckboxPublished = (id, currentPublished) => {
      dispatch(updatePublished({ id: id, published: currentPublished }));
   };

   // Функция для обновления данных (например, после удаления)
   const handleNewsUpdate = () => {
      loadNews(); //  Перезагружаем данные
   };

   const changePage = (page) => {
      if (page >= 1 && page <= Math.ceil(newsData?.all / limit)) {
         setCurrentPage(page);
      }
   };

   //Логика изменения индивидуального cчекбокса(групповое выделение)
   const choiceCheckbox = useSelector(state => state.news.choiceCheckbox);
   const handleChoiceCheckbox = useCallback((id) => dispatch(addOrRemoveChoiceCheckbox(id)), [dispatch]);

   const handleChoiceCheckboxAll = useCallback(() => {
      const allIds = newsData?.list?.map(el => el.id) || [];
      const allSelected = allIds.every(id => choiceCheckbox.includes(id));

      dispatch(setChoiceCheckboxRemoveOrAddAll(allSelected ? [] : allIds));
      setCheckboxAll(!allSelected);
   }, [newsData.list, checkboxAll])

   const removeSelectionsChecboxAll = useCallback(() => {
      dispatch(setChoiceCheckboxRemoveOrAddAll([]));
      setCheckboxAll(false);
   }, [dispatch, setCheckboxAll])

   /* Групповое изменение по массиву id */
   const publickAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, published: 1 })
         .then(_ => {
            handleNewsUpdate();
            removeSelectionsChecboxAll();
         })
   }
   const removePublickAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, published: 0 })
         .then(_ => {
            handleNewsUpdate();
            removeSelectionsChecboxAll();
         })
   }
   const moveInBasketInAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, remove: 1 })
         .then(_ => {
            handleNewsUpdate();
            removeSelectionsChecboxAll();
         })
   }

   /* React-hook-form */
   const schema = yup.object({
      title: yup.string().typeError('Должно быть строкой')//typeError выводит ошибку, когда не строка
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
      register,
      formState: {
         errors,
         isValid,//проверяет валидна ли форма
      },
      handleSubmit,
      reset,//параметр для очистки формы
      setValue,//при react-select прокидывать в функцию, возвращающую выбранное значение 
   } = useForm({
      mode: 'all', //этот параметр указывает когда проводить валидацию 
      resolver: yupResolver(schema)//подключение yup
   });

   return (
      <div className="mt54">
         {isReloading && <p>Загрузка...</p>} {/* Индикатор загрузки */}
         {isReloading || <ContantContainerAdmin>
            <h1 className={"h3-600 pageTitleAdmin"}>Новости</h1>
            <div className={s.container}>
               <div className="mt40 flexContainer">
                  <SearchInput placeholder="Поиск по новостям" />
                  <NavLink to={ROUTER.admin.newsArticle} className="publishBtn">Добавить новость</NavLink>
               </div>
               <DropDownMenu
                  isChoiceCheckbox={choiceCheckbox.length}
                  removeCheckboxAll={removeSelectionsChecboxAll}
                  isArr={choiceCheckbox}
                  publickAll={publickAll}
                  removePublickAll={removePublickAll}
                  moveInBasketInAll={moveInBasketInAll}
               />
               <div className='titleRowBlock titleRowBlock_main mt40'>
                  <div className='checkboxBlock'>
                     <input
                        onChange={handleChoiceCheckboxAll}
                        value={checkbox}
                        className="mainInput"
                        type="checkbox"
                        name="scales"
                     />
                  </div>
                  <div className='titleBlock'>Заголовок</div>
                  <div className='publishedBlock'>Опубликовано</div>
                  <div className='dateBlock'>Дата публикации</div>
               </div>
               <div>
                  {newsData?.list?.map((el) => (
                     <ItemComponentNews
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        published={el.published}
                        date={el.dateTime}
                        type={"news"}
                        updateCheckboxPublished={UpdateCheckboxPublished}
                        onNewsUpdate={handleNewsUpdate} // Передаем функцию обновления
                        isFavorite={el.favorite}
                        choiceCheckbox={choiceCheckbox.includes(el.id)}
                        setChoiceCheckbox={handleChoiceCheckbox}
                     />
                  ))}
               </div>
               <PaginationComponent
                  getData={newsData}
                  currentPage={currentPage}
                  totalPages={Math.ceil(newsData?.all / limit)}
                  changePage={changePage} // Передаем функцию изменения страницы
               />
            </div>
         </ContantContainerAdmin>}
      </div>
   );
};

export default NewsPageList;
