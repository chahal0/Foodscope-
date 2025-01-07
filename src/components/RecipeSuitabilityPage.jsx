import React, { useState } from "react";
import './RecipeSuitability.css';

// Function to get affiliate link for specific ingredients
function getAffiliateLink(ingredient) {
  const affiliateLinks = {
    'almond flour': 'https://www.amazon.com/s?k=almond+flour&tag=youraffiliatecode',
    'coconut oil': 'https://www.amazon.com/s?k=coconut+oil&tag=youraffiliatecode',
    'protein powder': 'https://www.amazon.com/s?k=protein+powder&tag=youraffiliatecode',
    // Add more ingredients and links as needed
  };

  return affiliateLinks[ingredient.toLowerCase()] || null;
}

// Function to get sustainable affiliate link for eco-friendly ingredients
function getSustainableAffiliateLink(ingredient) {
  const sustainableAffiliateLinks = {
    'almond flour': 'https://www.amazon.com/s?k=organic+almond+flour&tag=yourecoaffiliatecode',
    'coconut oil': 'https://www.amazon.com/s?k=organic+coconut+oil&tag=yourecoaffiliatecode',
    'protein powder': 'https://www.amazon.com/s?k=plant+protein+powder&tag=yourecoaffiliatecode',
    // Add more eco-friendly ingredient links as needed
  };

  return sustainableAffiliateLinks[ingredient.toLowerCase()] || null;
}

// Product Suggestions Component to show affiliate links for ingredients
function ProductSuggestions({ alternatives, sustainableAlternatives }) {
  const productSuggestions = alternatives.map((ingredient, index) => {
    const link = getAffiliateLink(ingredient.name);
    const sustainableLink = sustainableAlternatives
      ? getSustainableAffiliateLink(ingredient.name)
      : null;

    return (
      <div key={index} className="product-suggestion mb-4">
        <p>Need {ingredient.name}? Get it here:</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Purchase {ingredient.name}
          </a>
        )}
        {sustainableLink && (
          <div className="mt-2">
            <p>Prefer a sustainable option?</p>
            <a href={sustainableLink} target="_blank" rel="noopener noreferrer" className="btn btn-success">
              Purchase Eco-Friendly {ingredient.name}
            </a>
          </div>
        )}
      </div>
    );
  });

  return <div>{productSuggestions}</div>;
}

// Recipe Compatibility Check Component
function CompatibilityChecker({ recipeIngredients, onCheck }) {
  return (
    <div className="mb-4">
      <button className="btn btn-info" onClick={() => onCheck(recipeIngredients)}>
        Check Compatibility
      </button>
    </div>
  );
}

// Ingredient Carousel to display alternative ingredient suggestions
function IngredientCarousel({ alternatives }) {
  return (
    <div className="ingredient-carousel d-flex justify-content-center flex-wrap gap-4">
      {alternatives.map((ingredient, index) => (
        <div key={index} className="ingredient-card border rounded shadow-sm p-3">
          <h5>{ingredient.name}</h5>
          <p>{ingredient.description}</p>
        </div>
      ))}
    </div>
  );
}

// RecipeSuitabilityPage Component with all features integrated
function RecipeSuitabilityPage() {
  const [userRecipe, setUserRecipe] = useState({ title: "", ingredients: [] });
  const [alternatives, setAlternatives] = useState([]);
  const [sustainableAlternatives, setSustainableAlternatives] = useState(false); // Track eco-friendly toggle state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  // Simulated list of ingredients for the recipe
  const predefinedIngredients = [
    'almond flour', 'coconut oil', 'protein powder', 'avocado', 'olive oil', 'banana', 'spinach'
  ];

  // Function to check ingredient compatibility and provide alternatives
  const checkIngredientsCompatibility = (recipeIngredients) => {
    setLoading(true);
    setError("");

    // Simulate checking for missing ingredients and suggesting alternatives
    setTimeout(() => {
      const missingIngredients = predefinedIngredients.filter(
        ingredient => !recipeIngredients.includes(ingredient)
      );

      const alternativeSuggestions = missingIngredients.map((ingredient) => {
        return {
          name: ingredient,
          description: `We suggest a great alternative for ${ingredient}`,
        };
      });

      setAlternatives(alternativeSuggestions);
      setLoading(false);
    }, 2000);
  };

  // Handle Recipe Title and Ingredients Input
  const handleRecipeInputChange = (event) => {
    const { name, value } = event.target;
    setUserRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientInputChange = (index, value) => {
    const updatedIngredients = [...userRecipe.ingredients];
    updatedIngredients[index] = value;
    setUserRecipe({ ...userRecipe, ingredients: updatedIngredients });
  };

  // Add Ingredient Function
  const handleAddIngredient = () => {
    setUserRecipe({
      ...userRecipe,
      ingredients: [...userRecipe.ingredients, ""],
    });
  };

  // Handle checkbox toggle for missing ingredients
  const handleIngredientCheckbox = (ingredient) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <main className="container mt-5">
      <header className="text-center mb-5">
        <h1 className="glowing-text display-4">Recipe Compatibility & Ingredient Alternatives</h1>
      </header>

      <div className="component-wrapper p-4 bg-light rounded shadow-sm mb-5">
        <h2 className="text-center mb-3 p-3 border rounded box-title">Enter Your Recipe</h2>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={userRecipe.title}
          onChange={handleRecipeInputChange}
          className="form-control mb-3"
        />
        <h3>Ingredients</h3>
        {userRecipe.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              placeholder="Enter Ingredient"
              value={ingredient}
              onChange={(e) => handleIngredientInputChange(index, e.target.value)}
              className="form-control"
            />
          </div>
        ))}
        <button onClick={handleAddIngredient} className="btn btn-secondary mb-3">Add Ingredient</button>
        <CompatibilityChecker recipeIngredients={userRecipe.ingredients} onCheck={checkIngredientsCompatibility} />
      </div>

      {/* Sustainability Toggle */}
      <div className="sustainable-alternatives-toggle form-check mb-4">
        <input
          type="checkbox"
          className="form-check-input"
          checked={sustainableAlternatives}
          onChange={() => setSustainableAlternatives(!sustainableAlternatives)}
        />
        <label className="form-check-label">Show Eco-Friendly Alternatives</label>
      </div>

      {/* Ingredient Checklist for Missing Ingredients */}
      <div className="ingredient-checklist mb-4">
        <h3>Missing Ingredients:</h3>
        {predefinedIngredients.map((ingredient) => (
          <div key={ingredient} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={checkedIngredients.includes(ingredient)}
              onChange={() => handleIngredientCheckbox(ingredient)}
            />
            <label className="form-check-label">{ingredient}</label>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-indicator text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Checking your ingredients... 🧐</p>
        </div>
      )}

      {error && <div className="error-message text-danger text-center">{error}</div>}

      {alternatives.length > 0 && (
        <div className="component-wrapper p-4 bg-light rounded shadow-sm mb-5">
          <h2 className="text-center mb-3 p-3 border rounded box-title">Ingredient Alternatives</h2>
          <IngredientCarousel alternatives={alternatives} />
        </div>
      )}

      {alternatives.length > 0 && (
        <div className="component-wrapper p-4 bg-light rounded shadow-sm mb-5">
          <h2 className="text-center mb-3 p-3 border rounded box-title">Purchase Alternatives</h2>
          <ProductSuggestions alternatives={alternatives} sustainableAlternatives={sustainableAlternatives} />
        </div>
      )}
    </main>
  );
}

export default RecipeSuitabilityPage;
