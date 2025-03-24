import React, { useEffect, useState } from "react";
import s from "./Documents.module.css";
import API from "../../API";
import { NavLink } from "react-router-dom";
import { ROUTER } from "../../config";
import DocumentContainerDownloadDouble from "../../Components/DocumentContainerDownloadDouble";
import ContantContainerMain from "../../total/ContantContainerMain";

const Documents = () => {
  const [documentations, setDocumentations] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    API.getDocumentations(currentPage, limit).then((data) =>
      setDocumentations(data)
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, limit]);

  const totalPages = Math.ceil(documentations?.document?.all / limit);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationItems = () => {
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
  };

  return (
    <div>
      <ContantContainerMain>
        <div className={`mt40 breadcrumbs`}>
          <NavLink to={ROUTER.main} className="breadcrumbsFrom">
            Главная
          </NavLink>
          <span className={"breadcrumbsTo"}> / Документы</span>
        </div>
        <div className="text">
          <div className="mt40 pageTitle">Документы</div>

          <div className={s.container}>
            <div>
              {documentations.document?.list?.map((el) => (
                <div key={el.id} className="mt32">
                  <DocumentContainerDownloadDouble
                    title={el.name}
                    text={el.text}
                    value={el.property?.document?.value}
                  />
                </div>
              ))}
            </div>

            <div className={s.paginationContainer}>
              <span className={s.description}>Страницы:</span>
              <div className={s.pagination}>
                {getPaginationItems().map((page, index) => (
                  <div
                    key={index}
                    className={`${s.paginationItem} ${
                      currentPage === page ? s.active : ""
                    } ${page === "..." ? s.disabled : ""}`}
                    onClick={() => typeof page === "number" && changePage(page)}
                  >
                    {page}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContantContainerMain>
    </div>
  );
};

export default Documents;
