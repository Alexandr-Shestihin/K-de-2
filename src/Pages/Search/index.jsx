import ContantContainerMain from "../../total/ContantContainerMain";
import s from "./Search.module.css";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import searchIcon from "../../assets/icons/search.svg";
import clearX from "../../assets/icons/clearX.svg";
import { useDebounce } from "../../utils";
import { useEffect, useState } from "react";
import API from "../../API";
import DocumentContainerDownloadDouble from "../../Components/DocumentContainerDownloadDouble";
import DeputatForSearch from "../../Components/DeputatForSearch";
import NewsForSearch from "../../Components/NewsForSearch";

const Search = (props) => {

   const [search, setSearch] = useState('')
   const [searchResult, setSearchResult] = useState({})
   const [filterSearchResult, setFilterSearchResult] = useState("all")

   const writeDown = () => {
      API.getSearch(search)
         .then((data) => setSearchResult(() => {
            filterSearchResult !== "all" ? filtedSearchResult(data) : setSearchResult(data)
         }))
   }

   const searchDebounce = useDebounce(writeDown, 500)

   const filtedSearchResult = (data) => {
      for (let key in data) {
         key === filterSearchResult && setSearchResult(() => {
            const obj = {}
            obj[key] = data[key]
            return obj
         })
      }
   }

   useEffect(() => {
      writeDown()
   }, [filterSearchResult])

   return (
      <div>
         <ContantContainerMain>
            <div className={`mt40 breadcrumbs`}>
               <NavLink to={ROUTER.main} className="breadcrumbsFrom">
                  Главная
               </NavLink>
               <span className={"breadcrumbsTo"}> / Поиск</span>
            </div>
            <div className="mt40 pageTitle">Поиск</div>

            <div className="text">
               <div className={`mt40 ${s.inputContainer}`}>
                  <img src={searchIcon} className={s.img} alt="" />
                  <input
                     className={s.inputSearch}
                     onKeyUp={searchDebounce}
                     onChange={(e) => setSearch(e.target.value)}
                     value={search}
                     placeholder="Поиск" />
                  {search.length ? <img onClick={() => setSearch('')} src={clearX} className={s.clearX} alt="" /> : false}
               </div>
               <div className={`${s.btnRowContainer} mt20`} onClick={(e) => setFilterSearchResult(e.target.id)}>
                  <div className={`${s.btnFilter} ${filterSearchResult === "all" && s.active}`} id="all">Все</div>
                  <div className={`${s.btnFilter} ${filterSearchResult === "deputat" && s.active}`} id="deputat">Депутаты</div>
                  <div className={`${s.btnFilter} ${filterSearchResult === "news" && s.active}`} id="news">Новости</div>
                  <div className={`${s.btnFilter} ${filterSearchResult === "document" && s.active}`} id="document">Документы</div>
               </div>
               <div className={s.resultContainer}>
                  {searchResult?.document?.document?.list.map(el => <div key={el.id} className="mt32">
                     <DocumentContainerDownloadDouble
                        title={el.name}
                        text={el.text}
                        value={el.property?.document_to_content?.value}
                     />
                  </div>
                  )}
                  {searchResult?.deputat?.deputat?.list?.map(el => <DeputatForSearch
                     key={el.id}
                     title={el.name}
                     text={el.description}
                     img={el.image_preview}
                  />
                  )}
                  {searchResult?.news?.news?.list?.map(el => <NewsForSearch
                     key={el.id}
                     title={el.name}
                     text={el.description}
                     img={el.image_preview}
                     date={el.dateTime}
                     id={el.id}
                  />
                  )}
               </div>
            </div>
         </ContantContainerMain>
      </div>
   );
};
export default Search;
