import React from 'react';
import s from './CompositionParliamentaryGroups.module.css';
import edinyaRossiaParty from '../../assets/icons/edinyaRossiaParty.svg';

const CompositionParliamentaryGroups = ({ isActive }) => {

   return (
      <div className={`${s.tabPage} ${isActive === 'compositionParliamentaryGroups' && s.active}`}>
         <div className="text">
            <div className={s.logoBlock}>
               <div className={s.imgContainer}><img src={edinyaRossiaParty} alt="" /></div>
               <div className={s.textBlock}>
                  Всероссийская <br />
                  Политическая партия <br />
                  «Единая Россия»
               </div>
            </div>

            <div className={`pageTitle mt40 ${s.mobilMt20}`}>Депутатское объединение (фракция) Всероссийской политической партии «Единая Россия»:</div>

            <div className="mt40">
               <ol>
                  <li>Беляева Ирина Михайловна</li>
                  <li>Болотова Галина Александровна - заместитель руководителя фракции</li>
                  <li>Васильев Александр Владимирович - руководитель фракции</li>
                  <li>Герасимов Валентин Алексеевич</li>
                  <li>Демченко Глеб Александрович</li>
                  <li>Дряннов Александр Павлович</li>
                  <li>Иноземцев Евгений Владимирович</li>
                  <li>Ишкова Юлия Сергеевна</li>
                  <li>Кавторева Татьяна Ивановна</li>
                  <li>Каныгина Наталья Геннадьевна</li>
                  <li>Каримов Артур Маратович</li>
                  <li>Кашников Николай Александрович</li>
                  <li>Малиновский Сергей Константинович</li>
                  <li>Мамай Юлия Владимировна</li>
                  <li>Мирзонов Владислав Александрович</li>
                  <li>Монастырская Инна Валерьевна</li>
                  <li>Смирнова Надежда Ивановна</li>
                  <li>Спирина Ирина Алексеевна</li>
                  <li>Суслов Владимир Иванович</li>
                  <li>Томашов Николай Александрович</li>
                  <li>Федоров Алексей Дмитриевич</li>
                  <li>Шаипов Руслан Нариманович</li>
               </ol>
            </div>
         </div>

      </div>
   )
}
export default CompositionParliamentaryGroups;