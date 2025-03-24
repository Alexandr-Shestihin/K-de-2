import React, { useCallback, useEffect, useState } from "react";
import s from "./DeputiesPageList.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import ContantContainerAdmin from "../../total/ContantContainerAdmin";
import ItemComponent from "../ItemComponent";
import PaginationComponent from "../../total/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { deputates, updatePublished, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } from 'store/slice/deputates';
import { useRequireAccessLevel } from "utils";
import DropDownMenu from "ComponentsAdmin/DropDownMenu";
import SearchInput from "ComponentsAdmin/SearchInput/SearchInput";

const DeputiesPageList = ({ level }) => {

   const dispatch = useDispatch();
   const deputatesData = useSelector(state => state.deputates);
   const [checkboxAll, setCheckboxAll] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);  //  Состояние для текущей страницы
   const [limit] = useState(10);                       //  Состояние для количества элементов на странице
   const [isReloading, setIsReloading] = useState(false);  //  Состояние загрузки

   // Функция загрузки депутатов
   const loadDeputies = useCallback(async () => {
      setIsReloading(true);
      try {
         const data = await API.getDeputaty(currentPage, limit, "admin"); // Получаем данные с сервера
         dispatch(deputates(data)); // Обновляем состояние Redux
      } catch (error) {
         console.error('Ошибка при загрузке новостей:', error);
         //  Обработка ошибки
      } finally {
         setIsReloading(false);
      }
   }, [currentPage, limit, dispatch]);

   // Эффект для загрузки данных при монтировании компонента и изменении страницы
   useEffect(() => {
      loadDeputies();
   }, [loadDeputies]);

   const UpdateCheckbox = (id, currentPublished) => {
      dispatch(updatePublished({ id: id, published: currentPublished }));
   };

   // Функция для обновления данных (например, после удаления)
   const handleDeputatesUpdate = () => {
      loadDeputies(); //  Перезагружаем данные
   };

   const changePage = (page) => {
      if (page >= 1 && page <= Math.ceil(deputatesData?.all / limit)) {
         setCurrentPage(page);
      }
   };

   //Логика изменения индивидуального cчекбокса(групповое выделение)
   const choiceCheckbox = useSelector(state => state.deputates.choiceCheckbox);
   const handleChoiceCheckbox = useCallback((id) => dispatch(addOrRemoveChoiceCheckbox(id)), [dispatch]);

   const handleChoiceCheckboxAll = useCallback(() => {
      const allIds = deputatesData?.list?.map(el => el.id) || [];
      const allSelected = allIds.every(id => choiceCheckbox.includes(id));

      dispatch(setChoiceCheckboxRemoveOrAddAll(allSelected ? [] : allIds));
      setCheckboxAll(!allSelected);
   }, [deputatesData.list, checkboxAll])

   const removeSelectionsChecboxAll = useCallback(() => {
      dispatch(setChoiceCheckboxRemoveOrAddAll([]));
      setCheckboxAll(false);
   }, [dispatch, setCheckboxAll])

   /* Групповое изменение по массиву id */
   const publickAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, published: 1 })
         .then(_ => {
            loadDeputies();
            removeSelectionsChecboxAll();
         })
   }
   const removePublickAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, published: 0 })
         .then(_ => {
            loadDeputies();
            removeSelectionsChecboxAll();
         })
   }
   const moveInBasketInAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, remove: 1 })
         .then(_ => {
            loadDeputies();
            removeSelectionsChecboxAll();
         })
   }

   const accessLevel = useRequireAccessLevel(level)
   if (!accessLevel) {
      return null;
   }

   return (
      <ContantContainerAdmin>
            {isReloading && <p className="mt54">Загрузка...</p>} {/* Индикатор загрузки */}
            {!isReloading && (<>
                  <h1 className={"h3-600 pageTitleAdmin mt54"}>Депутаты</h1>
                  <div className={s.container}>
                     <div className="mt40 flexContainer">
                        <SearchInput placeholder="Поиск по новостям" />
                        <NavLink to={ROUTER.admin.deputiesArticle} className="publishBtn">
                           Добавить депутата
                        </NavLink>
                     </div>
                     <DropDownMenu
                        isChoiceCheckbox={choiceCheckbox.length}
                        removeCheckboxAll={removeSelectionsChecboxAll}
                        isArr={choiceCheckbox}
                        publickAll={publickAll}
                        removePublickAll={removePublickAll}
                        moveInBasketInAll={moveInBasketInAll}
                     />
                     <div className="titleRowBlock titleRowBlock_main mt40">
                        <div className="checkboxBlock">
                           <input
                              onChange={handleChoiceCheckboxAll}
                              value={checkboxAll}
                              className="mainInput"
                              type="checkbox"
                              name="scales"
                           />
                        </div>
                        <div className="titleBlock">Заголовок</div>
                        <div className="publishedBlock">Опубликовано</div>
                        <div className="dateBlock">Дата публикации</div>
                     </div>
                     <div>
                        {deputatesData?.list?.map((el) => (
                           <ItemComponent
                              key={el.id}
                              id={el.id}
                              name={el.name}
                              published={el.published}
                              date={el.created_at}
                              type={"deputies"}
                              updateCheckbox={UpdateCheckbox}
                              onUpdate={handleDeputatesUpdate} // Передаем функцию обновления депутата
                              choiceCheckbox={choiceCheckbox.includes(el.id)}
                              setChoiceCheckbox={handleChoiceCheckbox}
                           />
                        ))}
                     </div>
                     <PaginationComponent
                        getData={deputatesData}
                        currentPage={currentPage}
                        totalPages={Math.ceil(deputatesData?.all / limit)}
                        changePage={changePage} // Передаем функцию изменения страницы
                     />
                  </div>
               </>
            )}
      </ContantContainerAdmin>
   );
}
export default DeputiesPageList;
