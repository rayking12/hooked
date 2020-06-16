import React, { useState } from 'react';



const Search = (props) => {
    const [searchValue, setSearchValue] = useState("")
  
  const searchHandleChange = (e) => {
    setSearchValue (e.target.value);
  }
  
  const resetInputField = () => {
    setSearchValue('');
  }
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField()
  }

  return (
      <form>
          <input  
          value={searchValue}
           onChange={searchHandleChange}
           type='text'      />
           <input  onClick={callSearchFunction} type='Submit' value='Search'/>
      </form>
  )
}
export default Search