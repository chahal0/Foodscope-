import { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [recipe, setRecipe] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://cosylab.iiitd.edu.in/recipe-search/';

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (query.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    setLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const response = await axios.get(`${API_URL}recipe?pageSize=10&searchText=${query}`);
      const recipes = response.data.payload?.data || [];
      if (recipes.length > 0) {
        setRecipe(recipes[0]);
      } else {
        setError(`No recipes found for "${query}".`);
      }
    } catch (error) {
      console.error('Error searching for recipes:', error);
      setError('Error occurred while fetching recipes.');
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = (recipe) => {
    // Retrieve saved recipes from localStorage or initialize an empty array
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    // Check if the recipe is already saved
    const isRecipeAlreadySaved = savedRecipes.some(r => r.Recipe_id === recipe.Recipe_id);
    if (!isRecipeAlreadySaved) {
      savedRecipes.push(recipe);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      alert('Recipe saved!');
    } else {
      alert('This recipe is already saved!');
    }
  };

  const renderRecipeDetails = (recipe) => {
    const { Recipe_id, Recipe_title, img_url, url } = recipe;
    const sanitizedRecipeTitle = Recipe_title ? DOMPurify.sanitize(Recipe_title) : 'No Title';
    const altText = sanitizedRecipeTitle.replace(/<[^>]+>/g, '') || 'Recipe Image';

    return (
      <div className="recipe-details">
        <h2
          className="recipe-title"
          dangerouslySetInnerHTML={{ __html: sanitizedRecipeTitle }}
        />
        {img_url && <img src={img_url} alt={altText} className="recipe-image" />}
        <ul className="recipe-info">
          <li>
            <strong>URL:</strong>
            {url ? <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> : 'N/A'}
          </li>
        </ul>
        <button onClick={() => saveRecipe(recipe)} className="save-recipe-button">
          Save Recipe
        </button>
        <Link to={`/recipe/${Recipe_id}`} className="view-recipe-link">View Full Recipe</Link>
      </div>
    );
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-bar__form">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={handleInputChange}
          className="search-bar__input"
        />
        <button type="submit" className="search-bar__button" disabled={loading}>
          {loading ? <FaSpinner className="spinner" /> : <FaSearch />}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {!loading && !recipe && query.trim() !== '' && !error && (
        <div className="no-results">No recipes found for "{query}".</div>
      )}
      {recipe && renderRecipeDetails(recipe)}
    </div>
  );
}

export default SearchBar;
