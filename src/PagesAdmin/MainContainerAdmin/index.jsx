import React from 'react';
import ContantContainerMain from '../../total/ContantContainerMain';
import MenuAdmin from "../../ComponentsAdmin/MenuAdmin";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRequireAuth } from "utils";
import s from './MainContainerAdmin.module.css';

import HeaderAdmin from "../../ComponentsAdmin/HeaderAdmin";

const MainContainerAdmin = (props) => {

   /* Защита от не зарегистрированных пользователей */
   const auth = useRequireAuth(true);
   if (!auth.isAuth) {
      return null;
   }

   return (
      <div>
         <HeaderAdmin /* setActive={setVisuallyImpairedActive} active={visuallyImpairedActive} */ />

         <div className="columnContainerWrapper pb-120" >
            <MenuAdmin />

            <Outlet />

            {/* <div className="columnLarge">
            <ContantContainerMain>

               Административная паннель

            </ContantContainerMain>
         </div> */}
         </div>
      </div>
   )
}
export default MainContainerAdmin;