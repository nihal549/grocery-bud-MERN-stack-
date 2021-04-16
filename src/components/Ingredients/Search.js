import React , {useState,useEffect,useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [filter,setFilter]= useState([])
   const inputRef = useRef();
    const {filterHandle}=props

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
         fetch('/send',{
     method:'POST',
     headers:{
       'Content-Type':'application/json'
     },
     body:JSON.stringify({
       title:filter
     })
   }).then(response => response.json())
     .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
           filterHandle(loadedIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, filterHandle, inputRef]);





  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
           ref={inputRef}
          type="text" value={filter} onChange={(event)=>{setFilter(event.target.value)}}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
