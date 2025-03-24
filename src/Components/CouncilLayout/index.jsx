import React, { useState } from "react";
import ContantContainerMain from "../../total/ContantContainerMain";
import s from "./CouncilLayout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ROUTER } from "../../config";

const CouncilLayout = (props) => {
  const [tabActive, settabActive] = useState("structureCouncilDeputies");
  const navigate = useNavigate();
  return (
    <div>
      <ContantContainerMain>
        <div className={`mt40 breadcrumbs`}>
          <NavLink to={ROUTER.main} className="breadcrumbsFrom">
            Главная
          </NavLink>
          <span className="breadcrumbsTo"> / Депутаты</span>
        </div>
        <div
          onClick={(el) => el.target.id && settabActive(el.target.id)}
          className={`${s.tabsContainerRow}  mt40`}
        >
          <div
            id="structureCouncilDeputies"
            onClick={() => navigate(ROUTER.councilDeputies.deputies.deputies)}
            className={`${s.tab} ${
              tabActive === "structureCouncilDeputies" && s.active
            }`}
          >
            Структура Совета депутатов
          </div>
          <div
            id="scheduleReceptionDeputies"
            onClick={() => navigate(ROUTER.councilDeputies.deputies.chart)}
            className={`${s.tab} ${
              tabActive === "scheduleReceptionDeputies" && s.active
            }`}
          >
            График приема депутатов
          </div>
          <div
            id="awardsCouncilDeputies"
            onClick={() => navigate(ROUTER.councilDeputies.deputies.awards)}
            className={`${s.tab} ${
              tabActive === "awardsCouncilDeputies" && s.active
            }`}
          >
            Награды Совета депутатов
          </div>
          <div
            id="rulesParliamentaryEthics"
            onClick={() => navigate(ROUTER.councilDeputies.deputies.rules)}
            className={`${s.tab} ${
              tabActive === "rulesParliamentaryEthics" && s.active
            }`}
          >
            Правила депутатской этики
          </div>
          <div className="mt80">
            <Outlet />
          </div>
        </div>
      </ContantContainerMain>
    </div>
  );
};
export default CouncilLayout;
