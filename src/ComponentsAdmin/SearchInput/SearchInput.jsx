
import React from 'react';
import s from './SearchInput.module.css';
import search from '../../assets/icons/search_admin.svg';

const SearchInput = ({placeholder}) => {
   return (
      <div className="searchContainer">
         <img src={search} alt="" />
         <input className="searchInput" type="text" placeholder={placeholder} />
      </div>
   )
}

export default SearchInput;
