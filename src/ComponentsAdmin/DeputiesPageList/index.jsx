import React from "react";
import s from "./DeputiesPageList.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import ContantContainerAdmin from "../../total/ContantContainerAdmin";
import PaginationComponent from "../../total/PaginationComponent";
import { deputates, updatePublished, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } from 'store/slice/deputates';
import ItemComponent from "../ItemComponent";
import { useDataManagement, useRequireAccessLevel } from "utils";
import DropDownMenu from "ComponentsAdmin/DropDownMenu";
import SearchInput from "ComponentsAdmin/SearchInput/SearchInput";

const DeputiesPageList = ({ level }) => {

   const {
      data,
      checkboxAll,
      currentPage,
      limit,
      isReloading,
      UpdateCheckbox,
      handleDeputatesUpdate,
      changePage, choiceCheckbox,
      handleChoiceCheckbox, handleChoiceCheckboxAll, removeSelectionsChecboxAll,
      publickAll, removePublickAll, moveInBasketInAll
   } = useDataManagement(
      state => state.deputates,
      API.getDeputaty,
      data => deputates(data),
      updatePublished,
      addOrRemoveChoiceCheckbox,
      setChoiceCheckboxRemoveOrAddAll
   );

   const accessLevel = useRequireAccessLevel(level)
   if (!accessLevel) {
      return null;
   }

   return (
      <div className={`${s.deputatiesContainer} mt54`}>
         {isReloading && <p>Загрузка...</p>} {/* Индикатор загрузки */}
         {isReloading || <ContantContainerAdmin>
            <h1 className={"h3-600 pageTitleAdmin"}>Депутаты</h1>
            <div className={s.container}>
               <div className="mt40 flexContainer">
                  <SearchInput placeholder="Поиск по депутатам" />
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
               <div className='titleRowBlock titleRowBlock_main mt40'>
                  <div className='checkboxBlock'>
                     <input
                        onChange={handleChoiceCheckboxAll}
                        value={checkboxAll}
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
                        type={"deputies"}
                        updateCheckbox={UpdateCheckbox}
                        onUpdate={handleDeputatesUpdate} // Передаем функцию обновления депутата
                        choiceCheckbox={choiceCheckbox.includes(el.id)}
                        setChoiceCheckbox={handleChoiceCheckbox}
                     />
                  ))}
               </div>
               <PaginationComponent
                  getData={data}
                  currentPage={currentPage}
                  totalPages={Math.ceil(data?.all / limit)}
                  changePage={changePage} // Передаем функцию изменения страницы
               />
            </div>
         </ContantContainerAdmin>}
      </div>
   );
};

export default DeputiesPageList;
