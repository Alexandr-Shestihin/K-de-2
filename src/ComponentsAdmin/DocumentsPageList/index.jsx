import React, { useCallback, useEffect, useState } from "react";
import s from "./DocumentsPageList.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import ContantContainerAdmin from "../../total/ContantContainerAdmin";
import ItemComponent from "../ItemComponent";
import PaginationComponent from "../../total/PaginationComponent";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { documents, updatePublishedDocument, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } from "store/slice/documents";
import { useDataManagement, useRequireAccessLevel } from "utils";
import DropDownMenu from "ComponentsAdmin/DropDownMenu";
import SearchInput from "ComponentsAdmin/SearchInput/SearchInput";

const DocumentsPageList = React.memo(({ level }) => {
   const [
      documentsData,
      checkboxAll,
      currentPage,
      limit,
      isReloading,
      UpdateCheckbox,
      handleDocumentUpdate,
      changePage, choiceCheckbox,
      handleChoiceCheckbox, handleChoiceCheckboxAll, removeSelectionsChecboxAll,
      publickAll, removePublickAll, moveInBasketInAll
   ] = useDataManagement(
      'documents', API.getDocumentations, documents, updatePublishedDocument, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll
   );

   /* const dispatch = useDispatch();
   const documentsData = useSelector(state => state.documents, shallowEqual);
   const [checkboxAll, setCheckboxAll] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [limit] = useState(10);
   const [isReloading, setIsReloading] = useState(false); */

   // Функция загрузки документов
   /*  const loadDocuments = useCallback(async () => {
       setIsReloading(true);
       try {
          const data = await API.getDocumentations(currentPage, limit, "admin"); //  Используем API для документов
          dispatch(documents(data)); //  Диспатчим action documents
       } catch (error) {
          console.error('Ошибка при загрузке документов:', error);
          // Обработка ошибок
       } finally {
          setIsReloading(false);
       }
    }, [currentPage, limit, dispatch]); */

   /* useEffect(() => {
      loadDocuments();
   }, [loadDocuments]); */

   /* const UpdateCheckbox = (id, currentPublished) => {
      dispatch(updatePublishedDocument({ id: id, published: currentPublished }));
   }; */

   // Функция для обновления данных (например, после удаления)
   /* const handleDocumentUpdate = () => {
      loadDocuments(); //  Перезагружаем данные
   }; */

   /* const changePage = (page) => {
      if (page >= 1 && page <= Math.ceil(documentsData?.all / limit)) {
         setCurrentPage(page);
      }
   }; */

   //Логика изменения индивидуального cчекбокса(групповое выделение)
   /* const choiceCheckbox = useSelector(state => state.documents.choiceCheckbox);
   const handleChoiceCheckbox = useCallback((id) => dispatch(addOrRemoveChoiceCheckbox(id)), [dispatch]); */

   /* const handleChoiceCheckboxAll = useCallback(() => {
      const allIds = documentsData?.list?.map(el => el.id) || [];
      const allSelected = allIds.every(id => choiceCheckbox.includes(id));

      dispatch(setChoiceCheckboxRemoveOrAddAll(allSelected ? [] : allIds));
      setCheckboxAll(!allSelected);
   }, [documentsData.list, checkboxAll]) */

   /* const removeSelectionsChecboxAll = useCallback(() => {
      dispatch(setChoiceCheckboxRemoveOrAddAll([]));
      setCheckboxAll(false);
   }, [dispatch, setCheckboxAll]) */

   /* Групповое изменение по массиву id */
   /* const publickAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, published: 1 })
         .then(_ => {
            loadDocuments();
            removeSelectionsChecboxAll();
         })
   } */
   /* const removePublickAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, published: 0 })
         .then(_ => {
            loadDocuments();
            removeSelectionsChecboxAll();
         })
   } */
   /* const moveInBasketInAll = () => {
      API.postAddMultipleElementsPublick({ id: choiceCheckbox, remove: 1 })
         .then(_ => {
            loadDocuments();
            removeSelectionsChecboxAll();
         })
   } */

   const accessLevel = useRequireAccessLevel(level);
   if (!accessLevel) {
      return null;
   }

   return (
      <div className="mt54">
         {isReloading && <p>Загрузка...</p>} {/* Индикатор загрузки */}
         {isReloading || <ContantContainerAdmin>
            <h1 className={"h3-600 pageTitleAdmin"}>Документы</h1>
            <div className={s.container}>
               <div className="mt40 flexContainer">
                  <SearchInput placeholder="Поиск по документам" />
                  <NavLink to={ROUTER.admin.documentsArticle} className="publishBtn">Добавить документ</NavLink>
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
                        checked={checkboxAll}
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
                  {documentsData?.list?.map((el) => (
                     <ItemComponent
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        published={el.published}
                        date={el.created_at}
                        type={'documents'}
                        updateCheckbox={UpdateCheckbox}
                        onUpdate={handleDocumentUpdate} // Передаем функцию обновления документа
                        choiceCheckbox={choiceCheckbox.includes(el.id)}
                        setChoiceCheckbox={handleChoiceCheckbox}
                     />
                  ))}
               </div>
               <PaginationComponent
                  getData={documentsData}
                  currentPage={currentPage}
                  totalPages={Math.ceil(documentsData?.all / limit)}
                  changePage={changePage}
               />
            </div>
         </ContantContainerAdmin>}
      </div>
   );
});

export default DocumentsPageList;


