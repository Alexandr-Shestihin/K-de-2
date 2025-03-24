import React, { Children } from 'react';
import s from './ContantContainerAdmin.module.css';

const ContantContainerAdmin = ({children}) => {
   return (
      <div className={s.contantContainer}>
         {children}
      </div>
   )
}

export default ContantContainerAdmin;