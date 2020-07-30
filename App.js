import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App=()=> {

  const APP_ID="dff96e3c";
  const APP_KEY="14daf0687784f08161ebd17d78e4a71d";

  const [recipes, setRecipes]= useState([]);
  const [search, setSearch]= useState ('');
  const [query, setQuery]=useState('chicken');
 
  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes= async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data= await response.json();
    console.log(data.hits);
    setRecipes(data.hits);

  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
        <h1 className="header">Get Your Favorite Recipes</h1>
       <form className='form'onSubmit={getSearch}className='search-form'>
        <input className='search-bar' type='text' value={search} placeholder='Search Delicious Recipes' onChange={updateSearch}/>
         <button className='search-button' type='submit'>Search</button>
       </form>
       <div className='recipes'>
       {recipes.map(recipe=>(
         <Recipe key={recipe.recipe.label} 
         title={recipe.recipe.label} 
         calories={recipe.recipe.calories} 
         image={recipe.recipe.image} 
         ingredients={recipe.recipe.ingredients}/>
       ))}
       </div>
    </div>
  );
}

export default App;
