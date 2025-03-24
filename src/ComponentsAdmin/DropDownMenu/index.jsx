import React from 'react';
import s from './DropDownMenu.module.css';

import clearX from '../../assets/icons/clearX-admin.svg';
import publick from '../../assets/icons/publick-admin.svg';
import unpublish from '../../assets/icons/unpublish-admin.svg';
import del from '../../assets/icons/del-admin.svg';

const DropDownMenu = ({ isArr, removeCheckboxAll, publickAll, removePublickAll, moveInBasketInAll, isChoiceCheckbox }) => {

   return (
      <div className={`mt20 ${s.container}`}>
         {isChoiceCheckbox ?
            <div className={s.rowMenu}>
               <div className={s.item} onClick={removeCheckboxAll}>
                  <div className={s.imgContainer}><img src={clearX} alt="" /></div>
                  <div className={s.text}>{isArr.length} Выбрано</div>
               </div>
               <div className={s.item} onClick={publickAll}>
                  <div className={s.imgContainer}><img src={publick} alt="" /></div>
                  <div className={s.text}>Публиковать</div>
               </div>
               <div className={s.item} onClick={removePublickAll}>
                  <div className={s.imgContainer}><img src={unpublish} alt="" /></div>
                  <div className={s.text}>Снять с публикации</div>
               </div>
               <div className={s.item} onClick={moveInBasketInAll}>
                  <div className={s.imgContainer}><img src={del} alt="" /></div>
                  <div className={s.text}>Удалить</div>
               </div>
            </div>
            : false}
      </div>
   )
}
export default DropDownMenu;