import React, { useEffect, useState } from 'react';
import API from "../../API";
import s from './ItemComponent.module.css';

import Modal from '../../total/modal';
import deleteImg from '../../assets/icons/delete.svg';
import editImg from '../../assets/icons/edit.svg';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../config';
import { useDispatch } from 'react-redux';

const ItemComponent = ({ id, name, date, published, type, updateCheckbox, onUpdate, setChoiceCheckbox, choiceCheckbox }) => {

   const dispatch = useDispatch();
   const [isDeleting, setIsDeleting] = useState(false);
   const [deleteError, setDeleteError] = useState(null);
   const [modalActive, setModalActive] = useState(false);
   const [statusSend, setStatusSend] = useState({}); // Добавлено состояние для отображения статуса

   const handleCheckboxChange = () => {
      setChoiceCheckbox(id);
   }

   const handler = () => {
      const currentPublished = Number(!published);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("published", currentPublished);

      API.postChangeElement(formData)
         .then(response => {
            if (response?.result) {
               updateCheckbox(id, currentPublished);
            }
         });
   };

   const deleteElement = async () => {
      setIsDeleting(true);
      setDeleteError(null);
      setStatusSend({}); // Сбрасываем предыдущий статус

      try {
         const response = await API.postChangeElement({
            id: id,
            remove: 1,
         });

         if (response && response.result) {
            setStatusSend(response); // Сохраняем ответ для отображения статуса
            onUpdate();
         } else {
            setDeleteError('Не удалось удалить новость.');
         }

      } catch (error) {
         console.error('Ошибка при удалении новости:', error);
         setDeleteError('Не удалось удалить новость. Пожалуйста, попробуйте позже.');
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <div className={`${modalActive && s.activeItem} titleRowBlock`}>
         <div className="checkboxBlock">
            <input onChange={handleCheckboxChange} className="mainInput" type="checkbox" id={id} name="scales" checked={choiceCheckbox} />
         </div>
         <NavLink to={`${ROUTER.admin[`${type}ArticleEdit`]}${id}`} className='titleBlock' htmlFor={id}>{name}</NavLink>
         <div className='publishedBlock'>
            <input className="mainInput" type="checkbox" name="scales" onChange={handler} checked={published} />
         </div>
         <div className='dateBlock'>{date}</div>
         <svg onClick={() => setModalActive(!modalActive)} className='adminMenuBlock' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame">
               <path id="Vector" d="M10.9688 9C10.9688 9.38938 10.8533 9.77002 10.637 10.0938C10.4206 10.4175 10.1132 10.6699 9.75341 10.8189C9.39367 10.9679 8.99782 11.0069 8.61592 10.9309C8.23402 10.855 7.88322 10.6675 7.60788 10.3921C7.33255 10.1168 7.14504 9.76599 7.06908 9.38409C6.99312 9.00218 7.0321 8.60634 7.18111 8.24659C7.33012 7.88685 7.58246 7.57937 7.90622 7.36305C8.22998 7.14672 8.61062 7.03125 9 7.03125C9.5216 7.03303 10.0213 7.24102 10.3902 7.60985C10.759 7.97868 10.967 8.4784 10.9688 9ZM9 5.34375C9.38938 5.34375 9.77002 5.22829 10.0938 5.01196C10.4175 4.79563 10.6699 4.48815 10.8189 4.12841C10.9679 3.76867 11.0069 3.37282 10.9309 2.99092C10.855 2.60902 10.6675 2.25822 10.3921 1.98288C10.1168 1.70755 9.76599 1.52004 9.38408 1.44408C9.00218 1.36812 8.60633 1.4071 8.24659 1.55611C7.88685 1.70512 7.57937 1.95746 7.36304 2.28122C7.14672 2.60498 7.03125 2.98562 7.03125 3.375C7.03303 3.8966 7.24102 4.39632 7.60985 4.76515C7.97868 5.13398 8.4784 5.34197 9 5.34375ZM9 12.6563C8.61062 12.6563 8.22998 12.7717 7.90622 12.988C7.58246 13.2044 7.33012 13.5119 7.18111 13.8716C7.0321 14.2313 6.99312 14.6272 7.06908 15.0091C7.14504 15.391 7.33255 15.7418 7.60788 16.0171C7.88322 16.2925 8.23402 16.48 8.61592 16.5559C8.99782 16.6319 9.39367 16.5929 9.75341 16.4439C10.1132 16.2949 10.4206 16.0425 10.637 15.7188C10.8533 15.395 10.9688 15.0144 10.9688 14.625C10.967 14.1034 10.759 13.6037 10.3902 13.2349C10.0213 12.866 9.5216 12.658 9 12.6563Z" fill="#C0C0C0" />
            </g>
         </svg>

         <Modal
            active={modalActive}
            setActive={setModalActive}
         >
            {statusSend?.result ? (
               <div className="pageSubtitle">{statusSend.title}</div>
            ) : (
               <div>
                  <button onClick={deleteElement} className="deleteBtn" disabled={isDeleting}>
                     {isDeleting ? 'Удаление...' : <>В корзину <img src={deleteImg} alt="" /></>}
                     {deleteError}
                  </button>
                  <NavLink to={`${ROUTER.admin[`${type}ArticleEdit`]}${id}`} className="edit mt16">
                     Редактировать <img src={editImg} alt="" />
                  </NavLink>
               </div>
            )}
         </Modal>
      </div>
   )
}
export default ItemComponent;