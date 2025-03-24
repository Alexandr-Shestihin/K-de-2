import React, { useState, useEffect } from 'react';
import ContantContainerAdmin from '../../total/ContantContainerAdmin';
import s from './DocumentsArticlePageEdit.module.css';

import UploadFileAdmin from '../../total/UploadFileAdmin';
import { ROUTER } from '../../config';
import { NavLink, useParams } from 'react-router-dom';
import API from 'API';
import DocumentContainerDownload from 'Components/DocumentContainerDownload';
import { useRequireAccessLevel } from 'utils';

const DocumentsArticlePageEdit = ({ level }) => {

   const newsId = useParams().id.slice(3);

   const config =
   {
      content_category_id: 4,
      id: newsId,
      name: '',
      text: '',
      value: [],
      file_add: [],
      file_delete: [],
   }

   const [form, setForm] = useState(config);
   const [statusSend, setStatusSend] = useState({});

   const handler = (name, value) => {
      setForm(prev => ({ ...prev, [name]: value }))
   }

   useEffect(() => {
      API.getItemDocument(newsId)
         .then(data => setForm({
            ...form,
            name: data.document?.name,
            text: data.document?.text,
            value: data.document?.property?.document?.value
         }))
   }, [])

   const deleteFile = (id) => {
      setForm({
         ...form,
         value: form.value.filter(el => el.id !== id),
         file_delete: [...form.file_delete, id]
      })
   }

   const saveDocument = () => {
      const formData = new FormData();

      for (let key in form) {
         if (key === "file_add") {
            if (form[key] && form[key] instanceof FileList) {
               for (let i = 0; form[key].length > i; i++) {
                  formData.append(`file_add[${i}]`, form[key].item(i))
               }
            }
         } else if (key === "file_delete") {
            if (Array.isArray(form[key]) && form[key].length) {
               form[key].forEach((id, index) => {
                  formData.append(`${key}[${index}]`, id);
               });
            }
         } else if (key !== 'value') {
            formData.append(key, form[key]);
         }
      }

      API.postChangeElement(formData)
         .then(response => setStatusSend(response))
   };

   const accessLevel = useRequireAccessLevel(level)
   if (!accessLevel) {
      return null;
   }

   return (
      <div className="mt54">
         <ContantContainerAdmin>
            <div className={`breadcrumbs`}>
               <NavLink to={ROUTER.admin.documents} className='breadcrumbsFrom'>Документы</NavLink>
               <span className='breadcrumbsTo'> / Редактировать документ </span>
            </div>

            {statusSend?.result ? (
               <div className="pageTitle mt160">{statusSend.title}</div>
            ) : <><h1 className="pageTitle mt40">Редактировать документ</h1>
               <div className="text text_admin mt40">
                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">Заголовок документа</div>
                     <input placeholder='Заголовок документа' type="text" value={form.name} onChange={(e) => handler('name', e.target.value)} className="inputTitle mt24" />
                  </div>

                  <div className={`inputContainer mt24`}>
                     <div className="body-s-400 ml8">Описание</div>
                     <textarea onChange={(e) => handler('text', e.target.value)} value={form.text} className="textareaText" placeholder='Описание'></textarea>
                  </div>


                  <div className='mt24'>
                     {/* <UploadFile handler={handler} /> */}
                     <UploadFileAdmin
                        value={form.file_delete}
                        handler={handler}
                        title={'Загрузите документы в форматах: doc, docx, xls, xlsx, pdf, zip, rar'}
                        fileName={form.name}
                        discription={' '}
                        keyData={'file_add'} //ключ, по которому будет добавляться файлы
                     />

                     {/* <div className="mt48">
                           <UploadFile handler={handler} />
                        </div> */}
                  </div>

                  <div className='mt8'>
                     {form?.value?.map(el => <DocumentContainerDownload
                        key={el.id}
                        id={el.id}
                        format={el.format}
                        title={el.name}
                        /* text={el?.text} */
                        deleteFn={deleteFile}
                     />)}
                  </div>
               </div></>}

            <div className="rowContainer mt40">
               <button className="publishBtn" onClick={saveDocument}>Опубликовать</button>
            </div>
         </ContantContainerAdmin>
      </div>
   )
}
export default DocumentsArticlePageEdit;