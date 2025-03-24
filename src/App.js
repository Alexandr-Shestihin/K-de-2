import { useEffect } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "./config";
import "./App.css";

/* Pages */
import MainContainer from "./Pages/MainContainer";
import Main from "./Pages/Main";
import NewsPage from "./Pages/News";
import NewsArticle from "./Pages/NewsArticle";
import Symbolism from "./Pages/Symbolism";
import DeputiesMain from "./Pages/DeputiesMain";
import CompositionStructure from "./Pages/CompositionStructure";
import WriteAdministration from "./Pages/WriteAdministration";
import Contacts from "./Pages/Contacts";

import PageNotFound from "./Pages/PageNotFound";
import Documents from "./Pages/Documents";
import LegalBasisActivity from "./Pages/LegalBasisActivity";
import Search from "./Pages/Search";
import CouncilLayout from "./Components/CouncilLayout";
import ScheduleReceptionDeputies from "./Components/ScheduleReceptionDeputies";
import AwardsCouncilDeputies from "./Components/AwardsCouncilDeputies";
import RulesParliamentaryEthics from "./Components/RulesParliamentaryEthics";

/* Admin страницы */
import MainContainerAdmin from './PagesAdmin/MainContainerAdmin';
import NewsArticlePage from './PagesAdmin/NewsArticlePage';
import NewsArticlePageEdit from './PagesAdmin/NewsArticlePageEdit';
import NewsPageList from "./ComponentsAdmin/NewsPageList";
import DocumentsPageList from "./ComponentsAdmin/DocumentsPageList";
import DeputiesPageList from "./ComponentsAdmin/DeputiesPageList";
import DocumentsArticlePage from "./PagesAdmin/DocumentsArticlePage";
import DeputiesArticlePage from "./PagesAdmin/DeputiesArticlePage";
import DocumentsArticlePageEdit from "./PagesAdmin/DocumentsArticlePageEdit";
import LoginPage from "PagesAdmin/LoginPage";
import { useSelector } from "react-redux";
import DeputiesArticlePageEdit from "PagesAdmin/DeputiesArticlePageEdit";

function App({ setVisuallyImpairedActive, visuallyImpairedActive }) {

   /* Чтобы через NavLink страница всегда открывалась в начале  */
   const location = useLocation();
   useEffect(() => {
      // Scroll top when location changes
      window.scrollTo(0, 0);
   }, [location]);

   const auth = useSelector(state => state.auth);
   const navigate = useNavigate();
   /* const location = useLocation(); */

   useEffect(() => {
      if (auth.isAuth && location.pathname === '/login') {
         navigate('/news', { replace: true });
      }
   }, [auth.isAuth, navigate, location]);

   return (
      <div className="App">

         <div className="wrapper">
            <Routes>
               <Route path={ROUTER.main} element={<MainContainer setActive={setVisuallyImpairedActive} active={visuallyImpairedActive} />} >
                  <Route path={ROUTER.main} element={<Main />} />
                  <Route path={ROUTER.news} element={<NewsPage />} />
                  <Route path={ROUTER.newsArticle} element={<NewsArticle />} />
                  <Route path={ROUTER.documents} element={<Documents />} />
                  <Route path={ROUTER.councilDeputies.legalBasisActivity} element={<LegalBasisActivity />} />
                  <Route path={ROUTER.councilDeputies.symbolism} element={<Symbolism />} />
                  <Route path={ROUTER.councilDeputies.deputies.main} element={<CouncilLayout />} >
                     <Route path={ROUTER.councilDeputies.deputies.deputies} element={<DeputiesMain />} />
                     <Route path={ROUTER.councilDeputies.deputies.chart} element={<ScheduleReceptionDeputies />} />
                     <Route path={ROUTER.councilDeputies.deputies.awards} element={<AwardsCouncilDeputies />} />
                     <Route path={ROUTER.councilDeputies.deputies.rules} element={<RulesParliamentaryEthics />} />
                  </Route>
                  <Route
                     path={ROUTER.councilDeputies.compositionStructure}
                     element={<CompositionStructure />}
                  />
                  <Route path={ROUTER.councilDeputies.writeAdministration} element={<WriteAdministration />} />
                  <Route path={ROUTER.contacts.main} element={<Contacts />} />
                  <Route path={ROUTER.search} element={<Search />} />
               </Route>

               {/* <Route path="*" element={<PageNotFound />} /> */}

               {/* admin страницы  */}

               <Route path={ROUTER.admin.login} element={<LoginPage />} />

               <Route patch={ROUTER.admin.main} element={<MainContainerAdmin />}>

                  <Route path={ROUTER.admin.news} element={<NewsPageList />} />
                  <Route path={ROUTER.admin.newsArticle} element={<NewsArticlePage />} />
                  <Route path={ROUTER.admin.newsArticleEdit} element={<NewsArticlePageEdit />} />

                  <Route path={ROUTER.admin.documents} element={<DocumentsPageList level={1} />} />
                  <Route path={ROUTER.admin.documentsArticle} element={<DocumentsArticlePage level={1} />} />
                  <Route path={ROUTER.admin.documentsArticleEdit} element={<DocumentsArticlePageEdit level={1} />} />

                  <Route path={ROUTER.admin.deputies} element={<DeputiesPageList level={1} />} />
                  <Route path={ROUTER.admin.deputiesArticle} element={<DeputiesArticlePage level={1} />} />
                  <Route path={ROUTER.admin.deputiesArticleEdit} element={<DeputiesArticlePageEdit level={1} />} />
               </Route>

               <Route path='*' element={<PageNotFound />} />

            </Routes>
         </div>


      </div>
   );
}

export default App;