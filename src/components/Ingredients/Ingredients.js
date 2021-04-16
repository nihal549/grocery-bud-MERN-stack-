import React, { useState,useEffect,useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading,setLoading]=useState(false);
  const [error,setError]=useState()

  //fetch from db
 useEffect(()=>{
   fetch('/send',{
     method:'GET',
     headers:{
       'Content-Type':'application/json'
     }
   }).then(res=>{
     return res.json()}).then(data=>{
       const loadedIngrediants=[]
       for(let key in data){
          loadedIngrediants.push({
         id:key,
         title:data[key].title,
         amount:data[key].amount
       })
       }
       setUserIngredients(loadedIngrediants)
     })
 },[])
 //add to database
  const addIngredientHandler = ingredient => {
    fetch('/add',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
       title:ingredient.title,
       amount:ingredient.amount
      })
    }).then(res=>{
      
      return res.json()
      

    }).then(data=>{
      setUserIngredients(prevIngredients => [
      ...prevIngredients,
      { id:data.body, ...ingredient }
    ]);
    }

    )
  };

  //filter
  const filterHandle=useCallback((filter)=>{
     setUserIngredients(filter)
  },[])

  //remove ingreadiants
 const removeHandler = (ingredientId,ingredientTitle)=>{
   setLoading(true);
   fetch('/delete',{
     method:'POST',
     headers:{
       'Content-Type':'application/json'
     },
     body: JSON.stringify(
      {
        title:ingredientTitle
      }
     )
   }).then(response => {
      setLoading(false);
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    }).catch(error => {
      setError('Something went wrong!');
      setLoading(false);
    });
 }
//clearing error modal
const clearError=()=>{
  setError(null)
}
  return (
    <div className="App">
      
       {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler}
                      loading ={isLoading} />

      <section>
        <Search filterHandle={filterHandle} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
