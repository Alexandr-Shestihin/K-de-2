import React, { useState, useCallback } from 'react';
import s from './UploadFileAdminMono.module.css';
import IconWordPdfText from '../../Components/IconWordPdfText';
import clearX from '../../assets/icons/clearX.svg';

const UploadFileAdminMono = ({ handler, title, type, keyData }) => {

   const [files, setFiles] = useState(null);

   /* const handleFileChange = (e) => {
      if (type === "multy") {
         if (e.target.files) {
            handler(e.target.files[0])
            setFiles(e.target.files[0]);
         }
      } else handler(e.target.files[0])
   }; */
   /* Старый вариант кода. Пока не удалять */

   const handleFileChange = useCallback((e) => {
      const selectedFiles = e.target.files;
      setFiles(e.target.files);

      if (!selectedFiles || selectedFiles.length === 0) {
         return; // Ничего не делаем, если файлы не выбраны
      }

      // Передаем массив файлов, если type === "multy", иначе передаем первый файл
      const result = type === "multy" ? Array.from(selectedFiles) : selectedFiles[0]
      handler(result, keyData);
   }, [handler, type]);

   const DeleteSelectFile = () => {
      /* const result = Object.values(files).filter((data) => data.name !== name); */
      setFiles(null);
      handler(null, keyData);
   }

   return (
      <div className={s.containerUpload}>

         <div className={s.fileUpload}>
            <div className={s.uploadBox}>
               <label htmlFor="fileupload" className={s.uploadBtn}>{title}</label>
               <input
                  type="file"
                  id="fileupload"
                  className={s.dN}
                  onChange={handleFileChange}
                  accept=".doc, .docx, .pdf, .jpeg, .jpg, .png"
               />
            </div>
         </div>
         <div className="mt8">
            {
               files ? (
                  <div className={s.fileContainer}>
                     {
                        files?.[0].name?.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                           <IconWordPdfText type={'IMG'} /> :
                           files?.[0].name?.match(/.(doc|docx)$/i) ? <IconWordPdfText type={'DOCX'} /> :
                              files?.[0].name?.match(/.(PDF)$/i) ? <IconWordPdfText type={'PDF'} /> :
                                 <IconWordPdfText type={'anotherFile'} />
                     }
                     <div className={s.fileInfoBlock}>
                        {files?.[0]?.name ? files?.[0]?.name : "Заголовок документа"} <br />
                        {/* {discription.length ? discription : "Описание"} */}
                        <div type="button" className={s.deleteBtn} onClick={DeleteSelectFile}><img src={clearX} alt="" /></div>
                     </div>
                  </div>
               ) : false

            }
         </div>

      </div>
   );
}
export default UploadFileAdminMono;