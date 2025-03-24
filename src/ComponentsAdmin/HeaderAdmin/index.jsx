import React, { useEffect, useState } from 'react';
import s from './HeaderAdmin.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTER } from '../../config';
import logo from '../../assets/img/logos/full-logo-footer.svg';
import icon from '../../assets/icons/version_visually_impaired.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/slice/auth';
import API from 'API';

const HeaderAdmin = (props) => {

   const auth = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handlerLogout = () => {
      API.getLogout()
         .then(data => {
            dispatch(logout());
            navigate(ROUTER.admin.login, { replace: true });
         })
   };

   return (
      <div >
         <div className={`bgMainAdmin ${s.bgBlock}`}>
            <div className={s.logoRow}>
               <NavLink to={ROUTER.main} className={s.logoBlock}>
                  <img src={logo} alt="" />
               </NavLink>
               <div className={s.settingsContainer}>
                  {auth.isAuth && <div className={`${s.welcomeMessage} body-m-400`}>Добро пожаловать, {auth.user.login}</div>}
                  {auth.isAuth && <button onClick={handlerLogout} className={`loginBtn body-m-400`}>Выйти</button>}
               </div>
            </div>
         </div>

      </div >


   )
}
export default HeaderAdmin;