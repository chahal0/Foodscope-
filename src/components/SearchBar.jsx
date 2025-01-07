import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const PROXY_URL = 'http://localhost:3000/recipe-search'; // Proxy server URL

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Perform the search request
  const handleSearch = async (e) => {
    e.preventDefault();

    // Clear previous search results and errors
    setError(null);
    setRecipes([]);

    if (query.trim() === '') {
      setError('Please enter a search query.');
      return;
    }

    setLoading(true);

    try {
      // Construct the query parameters for the proxy server request
      const url = `${PROXY_URL}?searchText=${encodeURIComponent(query)}&pageSize=10`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-API-key': 'cosylab', // Proxy server forwards this header to the real API
        },
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes. Please try again later.');
      }

      const result = await response.json();
      if (result.success === 'true' && result.payload?.data) {
        setRecipes(result.payload.data);
      } else {
        setError('No recipes found.');
      }
    } catch (error) {
      // Catch any errors and display a message
      setError(`Error occurred while fetching recipes. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Render recipe details in a table
  const renderRecipeDetails = (recipe) => {
    const {
      Recipe_id,
      Recipe_title,
      Calories,
      Protein,
      Energy,
      Carbohydrate,
      Total_lipid,
      servings,
      total_time,
      Region,
      Sub_region,
      Utensils,
      Processes,
      vegan,
      url,
    } = recipe;

    const sanitizedRecipeTitle = DOMPurify.sanitize(Recipe_title || 'No Title');
    
    return (
      <tr key={Recipe_id}>
        <td>{Recipe_id}</td>
        <td dangerouslySetInnerHTML={{ __html: sanitizedRecipeTitle }}></td>
        <td>{Calories || 'N/A'}</td>
        <td>{Protein || 'N/A'}</td>
        <td>{Energy || 'N/A'}</td>
        <td>{Carbohydrate || 'N/A'}</td>
        <td>{Total_lipid || 'N/A'}</td>
        <td>{servings || 'N/A'}</td>
        <td>{total_time || 'N/A'} min</td>
        <td>{Region || 'N/A'}</td>
        <td>{Sub_region || 'N/A'}</td>
        <td>{Utensils ? Utensils.split('||').join(', ') : 'N/A'}</td>
        <td>{Processes ? Processes.split('||').join(', ') : 'N/A'}</td>
        <td>{vegan === '1.0' ? 'Yes' : 'No'}</td>
        <td>
          <a href={url} target="_blank" rel="noopener noreferrer">View Recipe</a>
        </td>
      </tr>
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
          aria-label="Search for a recipe"
        />
        <button type="submit" className="search-bar__button" disabled={loading} aria-label="Search">
          {loading ? <FaSpinner className="spinner" /> : <FaSearch className="search-bar__icon" />}
        </button>
      </form>

      {/* Display error message if present */}
      {error && <div className="error-message" role="alert">{error}</div>}

      {/* Display message when no results are found */}
      {!loading && !recipes.length && query.trim() !== '' && !error && (
        <div className="no-results">No recipes found for "{query}".</div>
      )}

      {/* Render search results */}
      {recipes.length > 0 && (
        <div className="search-results">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Recipe ID</th>
                <th>Recipe Title</th>
                <th>Calories</th>
                <th>Protein (g)</th>
                <th>Energy (kcal)</th>
                <th>Carbohydrates (g)</th>
                <th>Fat (g)</th>
                <th>Servings</th>
                <th>Total Time (min)</th>
                <th>Region</th>
                <th>Sub-region</th>
                <th>Utensils</th>
                <th>Processes</th>
                <th>Vegan</th>
                <th>Recipe URL</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map(renderRecipeDetails)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
