import React, { useState } from 'react';
import s from './CompositionStructure.module.css';
import ContantContainerMain from '../../total/ContantContainerMain';
import { ROUTER } from '../../config';
import { NavLink } from 'react-router-dom';
import CompositionParliamentaryGroups from '../../Components/CompositionParliamentaryGroups';
import CompositionStandingCommittees from '../../Components/CompositionStandingCommittees';

const CompositionStructure = (props) => {

   const [tabActive, settabActive] = useState('compositionParliamentaryGroups');

   return (
      <div>
         <ContantContainerMain>
            <div className={`mt40 breadcrumbs`}>
               <NavLink to={ROUTER.main} className='breadcrumbsFrom'>Совет депутатов</NavLink>
               <span className='breadcrumbsTo'> / Состав и структура</span>
            </div>
            <div onClick={(el) => el.target.id && settabActive(el.target.id)} className={`${s.tabsContainerRow}  mt40`}>
               <div id='compositionParliamentaryGroups' className={`${s.tab} ${tabActive === 'compositionParliamentaryGroups' && s.active}`}>Состав депутатских групп</div>
               <div id='compositionStandingCommittees' className={`${s.tab} ${tabActive === 'compositionStandingCommittees' && s.active}`}>Состав постоянных комиссий</div>
            </div>

            <div className="mt80">
               <CompositionParliamentaryGroups isActive={tabActive} />
               <CompositionStandingCommittees isActive={tabActive} />
            </div>

         </ContantContainerMain>
      </div>
   )
}
export default CompositionStructure;