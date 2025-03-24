import React, { useState } from "react";
import s from "./HeaderMobile.module.css";

import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import arrow_down from "../../assets/icons/arrow_down.svg";

const HeaderMobile = ({ setMobilMenu }) => {
   const [activeID, setActiveID] = useState();

   return (
      <div
         onClick={(e) => (e.target.href ? setMobilMenu(false) : false)}
         className={s.headerMobileContainer}
      >
         <div className={s.contentContainer}>
            <div
               className={s.itemContainer}
               onClick={(e) =>
                  e.target.id ? setActiveID(e.target.id) : setActiveID(false)
               }
            >
               <div onClick={() => setMobilMenu(false)} className={s.back}>
                  Назад
               </div>
               <div id="councilDeputies" className={`mt24 ${s.item}`}>
                  Совет депутатов{" "}
                  <div className={s.imgContainer}>
                     <img src={arrow_down} alt="" />
                  </div>
               </div>
               <NavLink
                  to={ROUTER.documents}
            /* id='history' */ className={`mt24 ${s.item}`}
               >
                  Документы{" "}
                  <div className={s.imgContainer}>
                     <img src={arrow_down} alt="" />
                  </div>
               </NavLink>
               <NavLink
                  to={ROUTER.news}
            /* id='khimkiDistrict' */ className={`mt24 ${s.item}`}
               >
                  Новости{" "}
                  <div className={s.imgContainer}>
                     <img src={arrow_down} alt="" />
                  </div>
               </NavLink>
               {/* <div id='activity' className={`mt24 ${s.item}`}>
                  {" "}
                  Интернет-ресурсы{" "}
                  <div className={s.imgContainer}>
                     <img src={arrow_down} alt="" />
                  </div>
               </div> */}
               <NavLink to={ROUTER.contacts.main} className={`mt24 ${s.item}`}>
                  Контакты{" "}
                  <div className={s.imgContainer}>
                     <img src={arrow_down} alt="" />
                  </div>
               </NavLink>
               {/* <NavLink
            to={ROUTER.search}
            className={`mt24 ${s.item}`}
            onClick={() => setMobilMenu(false)}
          >
            <div className={s.searchContainer}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4557 15.4561L19 19M11.125 17.2486C12.7495 17.2486 14.3074 16.6034 15.456 15.4549C16.6047 14.3063 17.25 12.7486 17.25 11.1243C17.25 9.50005 16.6047 7.9423 15.456 6.79377C14.3074 5.64524 12.7495 5 11.125 5C9.50055 5 7.94263 5.64524 6.79397 6.79377C5.64531 7.9423 5 9.50005 5 11.1243C5 12.7486 5.64531 14.3063 6.79397 15.4549C7.94263 16.6034 9.50055 17.2486 11.125 17.2486Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>

              <span>Поиск</span>
            </div>
          </NavLink> */}
            </div>

         </div>

         <div className={`${s.dropDownMenu} ${activeID && s.active}`}>
            <div onClick={() => setActiveID()} className={s.back}>
               Назад
            </div>

            <div
               className={` ${activeID === "councilDeputies" && s.linkMenuContainerActive
                  } ${s.linkMenuContainer}`}
            >
               <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.symbolism}>
                  Устав и Символика
               </NavLink>
               <NavLink
                  className={s.linkMenu}
                  to={ROUTER.councilDeputies.legalBasisActivity}
               >
                  Правовая основа деятельности
               </NavLink>
               <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.deputies.deputies}>
                  Депутаты
               </NavLink>
               <NavLink
                  className={s.linkMenu}
                  to={ROUTER.councilDeputies.compositionStructure}
               >
                  Состав и структура
               </NavLink>
               {/* <NavLink
                  className={s.linkMenu}
                  to={ROUTER.councilDeputies.writeAdministration}
               >
                  Написать в администрацию
               </NavLink> */}
            </div>

         </div>
      </div>
   );
};
export default HeaderMobile;
