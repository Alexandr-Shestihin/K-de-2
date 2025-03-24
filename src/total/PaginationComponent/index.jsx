import React, { useCallback, useEffect, useMemo, useState } from "react";
import s from './PaginationComponent.module.css';

const usePaginationItems = (currentPage, totalPages) => {
   return useMemo(() => {
       const pages = [];

       if (currentPage > 3) {
           pages.push(1);
           if (currentPage > 4) {
               pages.push("...");
           }
       }

       const startPage = Math.max(1, currentPage - 2);
       const endPage = Math.min(totalPages, currentPage + 2);

       for (let i = startPage; i <= endPage; i++) {
           pages.push(i);
       }

       if (currentPage < totalPages - 2) {
           if (currentPage < totalPages - 3) {
               pages.push("...");
           }
           pages.push(totalPages);
       }

       return pages;
   }, [currentPage, totalPages]);
};

const PaginationComponent = ({ getData, currentPage, totalPages, changePage }) => {
   const paginationItems = usePaginationItems(currentPage, totalPages);

   const handlePageClick = useCallback((page) => {
       if (typeof page === "number") {
           changePage(page);
       }
   }, [changePage]);

   return (
       <div className={s.paginationContainer}>
           <span className={s.description}>Страницы:</span>
           <div className={s.pagination}>
               {paginationItems.map((page, index) => (
                   <div
                       key={index}
                       className={`${s.paginationItem} ${currentPage === page ? s.active : ""
                           } ${page === "..." ? s.disabled : ""}`}
                       onClick={() => handlePageClick(page)}
                   >
                       {page}
                   </div>
               ))}
           </div>
       </div>
   );
};

export default PaginationComponent;