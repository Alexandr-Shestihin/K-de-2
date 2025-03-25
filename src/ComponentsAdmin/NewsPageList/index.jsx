import React from "react";
import s from "./NewsPageList.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import ContantContainerAdmin from "../../total/ContantContainerAdmin";
import PaginationComponent from "../../total/PaginationComponent";
import { news, updatePublished, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } from 'store/slice/news';
import ItemComponentNews from "ComponentsAdmin/ItemComponentNews";
import DropDownMenu from "ComponentsAdmin/DropDownMenu";
import SearchInput from "ComponentsAdmin/SearchInput/SearchInput";

import { useDataManagement } from "utils";

const NewsPageList = () => {

   const {
      data,
      checkboxAll,
      currentPage,
      limit,
      isReloading,
      UpdateCheckbox,
      handleNewsUpdate,
      changePage, choiceCheckbox,
      handleChoiceCheckbox, handleChoiceCheckboxAll, removeSelectionsChecboxAll,
      publickAll, removePublickAll, moveInBasketInAll
   } = useDataManagement(
      state => state.news,
      API.getNews,
      data => news(data),
      updatePublished,
      addOrRemoveChoiceCheckbox,
      setChoiceCheckboxRemoveOrAddAll
   );

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
                     <ItemComponentNews
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        published={el.published}
                        date={el.dateTime}
                        type={"news"}
                        updateCheckboxPublished={UpdateCheckbox}
                        onNewsUpdate={handleNewsUpdate} // Передаем функцию обновления
                        isFavorite={el.favorite}
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

export default NewsPageList;
