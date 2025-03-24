import React, { useEffect, useState } from 'react';
import s from './UploadFileAdmin.module.css';
import IconWordPdfText from '../../Components/IconWordPdfText';
import clearX from '../../assets/icons/clearX.svg';

const UploadFileAdmin = ({ value, handler, title, keyData, fileName, discription }) => {

   const [files, setFiles] = useState(null);

   useEffect(() => {
      handler(keyData, files);
   }, [files])

   const handleFileChange = (e) => {
      if (e.target.files) {
         [...e.target.files].forEach((file, i) => {
            setFiles([...value, file])
         });
         setFiles(e.target.files);
      }
   };

   const DeleteSelectFile = (name) => {
      const result = Object.values(files).filter((data) => data.name !== name);
      setFiles(result);
   }

   return (
      <div className={s.containerUpload}>


         <div className="">
            {
               files && [...files].map((data, index) => {
                  return (
                     <div className={s.fileContainer} key={index}>
                        {
                           data.name.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                              <IconWordPdfText type={'IMG'} /> :
                              data.name.match(/.(doc|docx)$/i) ? <IconWordPdfText type={'DOCX'} /> :
                                 data.name.match(/.(PDF)$/i) ? <IconWordPdfText type={'PDF'} /> :
                                    <IconWordPdfText type={'anotherFile'} />
                        }
                        <div className={s.fileInfoBlock}>
                           {data.name}
                           <div type="button" className={s.deleteBtn} onClick={() => DeleteSelectFile(data.name)}><img src={clearX} alt="" /></div>
                        </div>
                     </div>
                  )
               })
            }
         </div>

         <div className={s.fileUpload}>
            <div className={s.uploadBox}>
               <label htmlFor="fileupload" className={s.uploadBtn}>{title}</label>
               <input
                  type="file"
                  id="fileupload"
                  className={s.dN}
                  onChange={handleFileChange}
                  accept=".doc, .docx, .pdf, .jpeg, .jpg, .png"
                  multiple
               />
            </div>
         </div>

      </div>
   );
}
export default UploadFileAdmin;