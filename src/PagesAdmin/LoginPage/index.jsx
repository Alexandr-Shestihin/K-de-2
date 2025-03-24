import React, { useState, useEffect } from 'react';
import s from './LoginPage.module.css';
import HeaderAdmin from 'ComponentsAdmin/HeaderAdmin';

import { useAppDispatch } from "store";
import { login } from "store/slice/auth";
import API from "API";
import { ROUTER } from 'config';
import { useNavigate } from 'react-router-dom';



const LoginPage = (props) => {

   const navigate = useNavigate();

   const initialState = {
      /* id: 1, */
      login: 'sdAdmin',
      password: 'sdPass~132025'
   }
   const [authForm, setAuthForm] = useState(initialState);

   const handler = (e, key) => {
      setAuthForm({ ...authForm, [key]: e.target.value })
   }

   const dispatch = useAppDispatch()

   const loginSybmit = () => {
      const data = new FormData();
      for (let key in authForm) {
         data.append(key, authForm[key])
      }

      API.postLogin(data)
         .then((data) => {
            return data?.result === true && (
               dispatch(login({ ...authForm, ...{ accessLevel: +Object.keys(data.userGroup)[0] } })),
               navigate(ROUTER.admin.news, { replace: true })
            )
         })

   }

   return (
      <div>
         <HeaderAdmin />
         <div className={s.loginWrapper}>
            <div className={s.loginFormContainer}>
               <div className="pageTitle">Авторизация</div>
               <input onChange={(e) => handler(e, 'login')} value={authForm.login} className='inputTitle mt24' type="text" placeholder='Логин' />
               <input onChange={(e) => handler(e, 'password')} value={authForm.password} className='inputTitle mt16' type="password" placeholder='Пароль' />
               <div onClick={loginSybmit} className='publishBtn loginBtn mt16'>Войти</div>
            </div>
         </div>

         login: sdAdmin, <br />
         password: sdPass~132025 <br />
         <br />
         login: sdManager, <br />
         password: sdPass~090325 <br />
      </div>

   )
}
export default LoginPage;