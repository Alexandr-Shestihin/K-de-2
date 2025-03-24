import React from "react";
import s from "./DocumentContainerDownload.module.css";
import pdf from "../../assets/icons/pdf.svg";
import doc from "../../assets/icons/doc.svg";
import xls from "../../assets/icons/xls.svg";
import archive from "../../assets/icons/archive.svg";
import clearX from '../../assets/icons/clearX.svg';

const DocumentContainerDownload = ({
   document,
   documentName,
   title,
   text,
   date,
   format,
   id,
   deleteFn
}) => {

   return (
      <div className={s.documentContainer}>
         <a
            target="_blank"
            rel="noopener noreferrer"
            download={documentName}
            href={document}
            className={s.link}
         >
            <div className={s.imgContainer}>
               {format?.toLowerCase().includes("doc") ? (
                  <img className={`${s.documentIcon} ${s.DOCX}`} src={doc} alt="" />
               ) : format?.toLowerCase().includes("xls") ? (
                  <img className={`${s.documentIcon} ${s.XLS}`} src={xls} alt="" />
               ) : format?.toLowerCase().includes("zip") ||
                  format?.toLowerCase().includes("rar") ? (
                  <img
                     className={`${s.documentIcon} ${s.ARCHIVE}`}
                     src={archive}
                     alt=""
                  />
               ) : (
                  <img className={`${s.documentIcon} ${s.PDF}`} src={pdf} alt="" />
               )}
            </div>
            <div className={s.textInner}>
               <div className={s.title}>{title}</div>
               <div className="mt4"></div>
               {text}
            </div>
         </a>
         {deleteFn && <div onClick={() => deleteFn(id)} className={s.deleteBtn}><img src={clearX} alt="" /></div>}
         {date && <div className={s.datePublication}>от {date}</div>}
      </div>
   );
};
export default DocumentContainerDownload;
