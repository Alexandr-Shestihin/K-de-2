import React, { Children } from 'react';
import s from './contantContainerMain.module.css';

const contantContainerMain = ({children}) => {
   return (
      <div className={s.contantContainer}>
         {children}
      </div>
   )
}

export default contantContainerMain;