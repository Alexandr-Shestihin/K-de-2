import React from "react";
import s from "./DocumentsPageList.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import ContantContainerAdmin from "../../total/ContantContainerAdmin";
import ItemComponent from "../ItemComponent";
import PaginationComponent from "../../total/PaginationComponent";
import { documents, updatePublishedDocument, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } from "store/slice/documents";
import { useDataManagement, useRequireAccessLevel } from "utils";
import DropDownMenu from "ComponentsAdmin/DropDownMenu";
import SearchInput from "ComponentsAdmin/SearchInput/SearchInput";

const DocumentsPageList = React.memo(({ level }) => {
   
   const {
      data,
      checkboxAll,
      currentPage,
      limit,
      isReloading,
      UpdateCheckbox,
      handleDocumentUpdate,
      changePage, choiceCheckbox,
      handleChoiceCheckbox, handleChoiceCheckboxAll, removeSelectionsChecboxAll,
      publickAll, removePublickAll, moveInBasketInAll
   } = useDataManagement(
      state => state.documents,
      API.getDocumentations,
      data => documents(data),
      updatePublishedDocument,
      addOrRemoveChoiceCheckbox,
      setChoiceCheckboxRemoveOrAddAll
   );

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
                  {data?.list?.map((el) => (
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
                  getData={data}
                  currentPage={currentPage}
                  totalPages={Math.ceil(data?.all / limit)}
                  changePage={changePage}
               />
            </div>
         </ContantContainerAdmin>}
      </div>
   );
});

export default DocumentsPageList;


