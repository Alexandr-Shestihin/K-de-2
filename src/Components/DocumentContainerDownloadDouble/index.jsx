import React from "react";
import s from "./DocumentContainerDownloadDouble.module.css";
import { getDate } from '../../utils';
import pdf from "../../assets/icons/pdf.svg";
import doc from "../../assets/icons/doc.svg";
import xls from "../../assets/icons/xls.svg";
import archive from "../../assets/icons/archive.svg";
/* Second file */
import pdfSecond from "../../assets/icons/pdf_second.svg";
import docSecond from "../../assets/icons/doc_second.svg";
import xlsSecond from "../../assets/icons/xls_second.svg";
import archiveSecond from "../../assets/icons/archive_second.svg";

const getDocumentIcon = (format) => {
   const lowerFormat = format?.toLowerCase();
   const baseClass = `${s.documentIcon}`;
   if (lowerFormat?.includes("doc")) {
      return <img className={`${baseClass} ${s.DOCX}`} src={doc} alt="" />;
   } else if (lowerFormat?.includes("xls")) {
      return <img className={`${baseClass} ${s.XLS}`} src={xls} alt="" />;
   } else if (lowerFormat?.includes("zip") || lowerFormat?.includes("rar")) {
      return <img className={`${baseClass} ${s.ARCHIVE}`} src={archive} alt="" />;
   } else {
      return <img className={`${baseClass} ${s.PDF}`} src={pdf} alt="" />;
   }
};

const getDocumentIconSecond = (format) => {
   const lowerFormat = format?.toLowerCase();
   const baseClass = `${s.documentIcon} ${s.documentIconSecond}`;
   if (lowerFormat?.includes("doc")) {
      return <img className={`${baseClass} ${s.DOCX}`} src={docSecond} alt="" />;
   } else if (lowerFormat?.includes("xls")) {
      return <img className={`${baseClass} ${s.XLS}`} src={xlsSecond} alt="" />;
   } else if (lowerFormat?.includes("zip") || lowerFormat?.includes("rar")) {
      return <img className={`${baseClass} ${s.ARCHIVE}`} src={archiveSecond} alt="" />;
   } else {
      return <img className={`${baseClass} ${s.PDF}`} src={pdfSecond} alt="" />;
   }
};

const DocumentSecondItem = ({ el }) => (
   <div className={`mt12 ${s.documentContainer} ${s.documentSecondItem}`}>
      <a
         target="_blank"
         rel="noopener noreferrer"
         download={el.name?.trim()}
         href={el.src}
         className={`${s.link} ${s.link_Second}`}
      >
         {getDocumentIconSecond(el.format)}
         <div className={`${s.textInner} ${s.textInner_Second}`}>
            <div className={s.title}>{el.name}</div>
         </div>
      </a>
   </div>
);

const DocumentContainerDownloadDouble = ({ title, text, value = [null, null] }) => {
   const [firstEl, ...secondEl] = value;

   return (
      <div>
         <div className={s.documentContainer}>
            <a
               target="_blank"
               rel="noopener noreferrer"
               download={firstEl?.name?.trim()}
               href={firstEl?.src}
               className={s.link}
            >
               <div className={s.imgContainer}>
                  {getDocumentIcon(firstEl?.format)}
               </div>
               <div className={s.textInner}>
                  <div className={s.title}>{title}</div>
                  <div className="mt4"></div>
                  {text}
               </div>
            </a>
            {firstEl?.created_at && <div className={s.datePublication}>от {getDate(firstEl?.created_at)}</div>}
         </div>
         <div className="mt24">
            {secondEl[0] && secondEl.map(el => (
               <DocumentSecondItem key={el?.id} el={el} />
            ))}
         </div>
      </div>
   );
};

export default DocumentContainerDownloadDouble;