// 


// steps/ListingStep.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from "../components/card";
import Cart from "../components/cart";

const SERVER_LINK = import.meta.env.VITE_RENDER_EXTERNAL_UR;

const ListingStep = ({ 
  userData, 
  cartItems, 
  onAdd, 
  onRemove, 
  setStep, 
  allowedId 
}) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from MongoDB
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${SERVER_LINK}/server/list/foods`); // Adjust this endpoint as needed
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setFoods(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching foods:', err);
        setError('Failed to load food items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading delicious food items...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // No data state
  if (!foods || foods.length === 0) {
    return (
      <div className="no-data-container">
        <h2>No food items available</h2>
        <p>Please check back later or contact support.</p>
      </div>
    );
  }

  return (
    <>
      {userData.firstName && (
        <h1 className="heading">Hello, {userData.firstName}</h1>
      )}

      <div className="addlink-div">
        {Number(userData.id) === Number(allowedId) && (
          <Link to="/add" className="add-link">
            ➕ Add List
          </Link>
        )}
      </div>

      <h1 className="heading">Order Food</h1>

      <Cart cartItems={cartItems} onCheckout={() => setStep('checkout')} />
      
      <div className="cards__container">
        {foods.map((foodDoc, docIndex) => (
          foodDoc.categories && foodDoc.categories.map((category, categoryIndex) => (
            <div key={`${docIndex}-${categoryIndex}`} className="category__block">
              <h2 className="category__heading">{category.title}:</h2>
              
              <div className="cards__inner__wrap">
                {category.items && category.items.map((food, itemIndex) => (
                  <Card
                    food={{
                      ...food,
                      id: food._id || `${docIndex}-${categoryIndex}-${itemIndex}` // Ensure unique ID
                    }}
                    key={food._id || `${docIndex}-${categoryIndex}-${itemIndex}`}
                    step="listing"
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>
          ))
        ))}
      </div>
    </>
  );
};

export default ListingStep;