import React, { useEffect, useState } from "react";
import ContantContainerMain from '../../total/ContantContainerMain';
import s from "./Deputies.module.css";
import Deputates from "../../Components/Deputates";

import Malinovsky from "../../assets/img/deputates/Malinovsky.png";

import API from "../../API";

const DeputiesMain = () => {

   const [deputaty, setDeputaty] = useState([])

   useEffect(() => {
      API.getDeputaty(1, 50)
         .then((data) =>
            setDeputaty(data.deputat.list)
         );
   }, []);

   return (
      <div>
         <ContantContainerMain>
         <div className={`${s.columnContainer}`}>
            <div>
               <div className="pageTitle">Депутаты</div>
               {deputaty?.map(el => <Deputates
                  key={el.id}
                  img={el.image_preview}
                  name={el.name}
                  tel={el.phone}
                  email={el.email}
                  vkLink={el?.social?.["vk"] ?? null}
                  okLink={el?.social?.["ok"]  ?? null}
                  text={el.description}
                  description={el.description}
                  partyId={el.party}
               />)}
            </div>
            <div>
               <div className="pageTitle">Председатель совета депутатов</div>
               <Deputates
                  img={Malinovsky}
                  name={"Малиновский Сергей Константинович"}
                  text={`
                  Родился 17 октября 1984 года в городе Исфара Ленинабадской области республики Таджикистан.<br /><br />
                  Окончил с отличием Международный юридический институт при Министерстве юстиции Российской Федерации.<br /><br />
                  С 2003 года по 2015 год проходил службу в органах внутренних дел Российской Федерации.<br /><br />
                  В 2011 году окончил Московский университет Министерства внутренних дел Российской Федерации по специальности "юриспруденция".<br /><br />
                  С 2015 года по 2021 год работал в Администрации городского округа Химки Московской области.<br /><br />
                  В 2020 году окончил Академию народного хозяйства при Президенте РФ. Присвоена степень магистра по специальности "государственное и муниципальное управление".<br /><br />
                  19 сентября 2021 года избран депутатом Совета депутатов городского округа Химки Московской области.<br /><br />
                  04 октября 2021 года избран Председателем Совета депутатов городского округа Химки Московской области.<br /><br />
                  Женат. Трое детей.

                  `}
               />
            </div>
         </div>
         </ContantContainerMain>
      </div>
   );
};
export default DeputiesMain;
