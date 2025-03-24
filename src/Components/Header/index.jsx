import React, { useState } from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import { ROUTER } from '../../config';
import ContantContainerMain from '../../total/ContantContainerMain';
import logo from '../../assets/img/logos/full-logo.svg';
import HeaderMobile from '../HeaderMobile';
import icon from '../../assets/icons/version_visually_impaired.svg';
import searchIcon from '../../assets/icons/search.svg';

const Header = ({active, setActive}) => {

   const [activeID, setActiveID] = useState();
   const [mobilMenu, setMobilMenu] = useState(false);

   return (
      <div onMouseOver={(e) => setActiveID(false)} >
         {mobilMenu && <HeaderMobile setMobilMenu={setMobilMenu} />}
         <div className={`bgMain ${s.bgBlock}`}>
            <ContantContainerMain>
               <div className={s.logoRow}>
                  <NavLink to={ROUTER.main} className={s.logoBlock}>
                     <img src={logo} alt="" />
                     {/* <div className={s.textMain}>
                        <div className={s.titleAdministration}>СОВЕТ ДЕПУТАТОВ</div>
                        <div className={s.titleInfo}>Городского округа Химки Московской области</div>
                     </div> */}
                  </NavLink>
                  <div onClick={() => setMobilMenu(true)} className={s.mobilMenu}>Меню</div>
                  <div className={s.settingsContainer}>
                     {active || <div className={s.versionVI} onClick={() => setActive(true)}><img src={icon} alt="" />Версия для слабовидящих</div>}
                  </div>
               </div>
            </ContantContainerMain>
         </div>

         <div className={s.mainMenuContainer}>
            <ContantContainerMain>
               <div className={`${s.mainMenu}`}>
                  <div onMouseOver={e => e.stopPropagation()} onClick={(e) => e.target.id ? setActiveID(e.target.id) : setActiveID(false)} className={s.itemsContainer}>
                     <div id='councilDeputies' className={`${s.item} ${s.itemArrow}`}>
                        Совет депутатов
                        <div className={`${s.dropDownMenu} ${activeID === 'councilDeputies' && s.dropDownMenuActive}`}>
                           <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.symbolism}>
                              Устав и Символика
                           </NavLink>
                           <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.legalBasisActivity}>
                              Правовая основа деятельности
                           </NavLink>
                           <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.deputies.deputies}>
                              Депутаты
                           </NavLink>
                           <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.compositionStructure}>
                              Состав и структура
                           </NavLink>
                           {/* <NavLink className={s.linkMenu} to={ROUTER.councilDeputies.writeAdministration}>
                              Написать в администрацию
                           </NavLink> */}
                        </div>
                     </div>
                     <NavLink to={ROUTER.documents} /* id='history' */ className={`${s.item}`}>
                        Документы
                        {/* <div className={`${s.dropDownMenu} ${activeID === 'history' && s.dropDownMenuActive}`}>
                           <NavLink to={ROUTER.history.main} className={s.linkMenu} >
                              История
                           </NavLink>
                           <NavLink to={ROUTER.history.khimki} className={s.linkMenu} >
                              История города Химки
                           </NavLink>
                           <NavLink to={ROUTER.history.greatPatrioticWar} className={s.linkMenu} >
                              <p>Великая Отечественная</p>
                              война 1941-1945 гг.
                           </NavLink>
                           <NavLink to={ROUTER.history.pamyatnikiIstoriiKultury} className={s.linkMenu} >
                              <p>Памятники истории</p>
                              и культуры
                           </NavLink>
                           <NavLink to={ROUTER.history.gorodPobratim} className={s.linkMenu} >
                              Город побратим
                           </NavLink>
                           <NavLink to={ROUTER.history.cityCoatOfArms} className={s.linkMenu} >
                              Герб города
                           </NavLink>
                        </div> */}
                     </NavLink>
                     <NavLink to={ROUTER.news} id='khimkiDistrict' className={`${s.item}`} >
                        Новости
                        {/* <div className={`${s.dropDownMenu} ${activeID === 'khimkiDistrict' && s.dropDownMenuActive}`}>
                           <NavLink to={ROUTER.khimkiDistrict.main} className={s.linkMenu}>
                              Городской округ Химки
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.performanceIndicators} className={s.linkMenu}>
                              Показатели работы
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.symbolism} className={s.linkMenu}>
                              Устав и символика
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.administrationStructure} className={s.linkMenu}>
                              Структура администрации
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.publicChamber} className={s.linkMenu}>
                              Общественная палата
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.auditChamber} className={s.linkMenu}>
                              Контрольно-счетная палата
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.tic} className={s.linkMenu}>
                              ТИК города Химки
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.publicOrganizations} className={s.linkMenu}>
                              Общественные организации
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.governmentAgency} className={s.linkMenu}>
                              Государственные организации
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.scienceCity} className={s.linkMenu}>
                              Наукоград
                           </NavLink>
                           <NavLink to={ROUTER.khimkiDistrict.informationSystems} className={s.linkMenu}>
                              Информационные системы
                           </NavLink>
                        </div> */}
                     </NavLink>
                     {/* <a href={"https://old.sdhimki.ru/internet/"} id='activity' className={`${s.item}`}>
                        Интернет-ресурсы

                     </a> */}
                     {/* <a href='http://old.admhimki.ru/dokumenty/' className={s.item}>Документы</a> */}
                     {/* <div id='prosecutorOffice' className={`${s.item} ${s.itemArrow}`}>
                        Прокуратура
                        <div className={`${s.dropDownMenu} ${activeID === 'prosecutorOffice' && s.dropDownMenuActive}`}>
                           <NavLink to={ROUTER.prosecutorOffice.main} className={s.linkMenu}>
                              Прокуратура
                           </NavLink>
                           <NavLink className={s.linkMenu}>
                              Химкинская городская прокуратура
                           </NavLink>
                           <NavLink to={ROUTER.prosecutorOffice.militaryProsecutorOfficeSolnechnogorskGarrison} className={s.linkMenu}>
                              <p>Военная прокуратура</p>
                               Солнечногорского гарнизона
                           </NavLink>
                           <NavLink to={ROUTER.prosecutorOffice.moscowInterregionalTransport} className={s.linkMenu}>
                              <p>Московская межрегиональная</p>
                               транспортная прокуратура
                           </NavLink>
                           <NavLink to={ROUTER.prosecutorOffice.correctionalInstitutions} className={s.linkMenu}>
                              <p>Московская прокуратура по надзору</p>
                              <p>за соблюдением законов в исправительных</p>
                              <p> учреждениях Московской области</p>
                           </NavLink>
                           <NavLink to={ROUTER.prosecutorOffice.northernTransportProsecutorOffice} className={s.linkMenu}>
                              Северная транспортная прокуратура
                           </NavLink>
                           <NavLink className={s.linkMenu}>
                              <p>Правовое просвещение и правовое</p> 
                              информирование
                           </NavLink>
                        </div>
                     </div> */}
                     {/* <div id='citizensAppeals' className={`${s.item} ${s.itemArrow}`}>
                        Обращения граждан
                        <div className={`${s.dropDownMenu} ${activeID === 'citizensAppeals' && s.dropDownMenuActive}`}>
                           <NavLink to={ROUTER.citizensAppeals.main} className={s.linkMenu}>
                              Работа с обращениями граждан
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.legalRegulation} className={s.linkMenu}>
                              Правовое регулирование
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.virtualReceptionHeadCityDistrict} className={s.linkMenu}>
                              Виртуальная приемная Главы <br /> городского округа
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.resultsConsiderationApplications} className={s.linkMenu}>
                              Результаты рассмотрения обращений
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.writeAdministration} className={s.linkMenu}>
                              Написать в Администрацию
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.receptionProcedureTime} className={s.linkMenu}>
                              Порядок и время приема
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.allRussianDayReceptionCitizens} className={s.linkMenu}>
                              Общероссийский день приёма <br /> граждан в День Конституции <br /> Российской Федерации 12 декабря
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.informationForReview} className={s.linkMenu}>
                              Информация для ознакомления <br /> желающим отправить обращениев <br /> форме электронного документа
                           </NavLink>
                           <NavLink to={ROUTER.citizensAppeals.responsesInquiriesIndefiniteNumberPersons} className={s.linkMenu}>
                              Ответы на обращения, <br /> затрагивающие интересы <br /> неопределенного круга лиц
                           </NavLink>
                        </div>
                     </div> */}
                     <NavLink to={ROUTER.contacts.main} className={s.item}>Контакты</NavLink>

                     <button className={`${s.mobilHotLine} ${s.hotLine}`}>Горячая линия</button>
                  </div>

                  <NavLink to={ROUTER.search} className={s.linkMenu}>
                     <div className={s.searchBlock}>
                        <div>
                           <img src={searchIcon} alt="" />
                        </div>
                        <div>Поиск</div>
                     </div>
                  </NavLink>

               </div>
            </ContantContainerMain>
         </div>
      </div >


   )
}
export default Header;