import { React, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Select from 'react-select';
import './ReactSelect.css';

//npm i react-select
/* 
npx tailwindcss init для стилизации
После этой команды создастся в одной дирректории с package.json tailwind.config.js
Внутри:
module.exports = {
   content: [],
   theme: {
     extend: {},
   },
   plugins: [],
 }
*/
/* 
В index.css прописать 
@tailwind base;
@tailwind components;
@tailwind utilities;
*/

const ReactSelect = (props) => {

   const initialize = props.isMulti ? [...props.initialValue] : props.initialValue;
   //Данные инициализации с проверкой на множественный выбор

   const [currentValues, setCurrentValues] = useState(initialize);

   const options = [];
   //массив данных списка выбора

   const getValue = () => {
      if (currentValues) {
         return props.isMulti ?
            options.filter(el => currentValues.indexOf(el.value) >= 0) :
            options.find(el => el.value === currentValues);
      } else {
         return props.isMulti ? [] : "";
      }
   }

   //Для валидации с react-hook-form
   const isReactHookForm = typeof props.errors !== 'undefined';//проверяем используется ли react-hook-form
   const controllerId = useRef(); //создаём ссылку, чтобы синхронизировать react select с react-hook-form
   useEffect(() => {
      if (isReactHookForm) {
         props.onChangeValue(props.name, getValue().value);//Вводим данные в react-hook-form
      }
   }, [])
   //костыль для валидации с react-hook-form

   const onChangeSelect = (value) => {
      const result = props.isMulti ? value.map(el => el.value) : value.value;
      setCurrentValues(result);

      if (isReactHookForm) {
         props.onChangeValue(props.name, result);//при onChange Select передаём данные в react-hook-form
         //две эти строчки дёргают react-hook-form, чтобы он проваледировал
         controllerId.current.focus();
         controllerId.current.blur();
      } else {
         props.onChangeValue(result);
      }
   }

   if (props.valuesOptions) {
      props.valuesOptions?.map(el => {
         options.push({ value: el[props.valueName], label: el[props.labelName] })
      })
      options.splice(props.valuesOptions.length, props.valuesOptions.length);
   }

   return (<div>
      <div className={isReactHookForm ? (props.errors[props.name] && 'react_select__err') : 'falseSelect'}>
         <Select
            classNamePrefix='react_select'
            onChange={onChangeSelect}
            value={getValue()}
            options={options}
            isMulti={props.isMulti}
            isLoading={!props.valuesOptions && true}
            placeholder={props.placeholder}
            isSearchable={props.isSearchable}
            onBlur={() => {
               if (isReactHookForm) {
                  controllerId.current.focus();
                  controllerId.current.blur();
               }
            }}
         />
      </div>

      {
         isReactHookForm ? <input
            className='inputDisplayNone'
            {...props.register(props.name)}
            ref={controllerId}
            type='text'
            id={props.name}
         /> : false
      }

      {isReactHookForm ?
         props.errors[props.name] && <div className='react_select__messageErr'>{props.errors[props.name].message || 'Error!'}</div>
         : false}
   </div >)
}
export default ReactSelect;