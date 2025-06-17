// 


// steps/ListingStep.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from "../components/card";
import Cart from "../components/cart";
import '../assets/style.css';

const RENDER_EXTERNAL_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;

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



useEffect(() => {
  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${RENDER_EXTERNAL_URL}/server/read/foods`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Validate JSON response
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Invalid response body:', text.slice(0, 200));
        throw new Error('Invalid response format');
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










  const handleDeleteItem = (itemId, categoryId) => {
    // Remove item from UI immediately for better UX
    setFoods(prevData => 
      prevData.map(category => {
        if (category._id === categoryId) {
          return {
            ...category,
            items: category.items.filter(item => item._id !== itemId)
          };
        }
        return category;
      })
    );
  };













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
                <div className='card-del-div'>
                {category.items && category.items.map((food, itemIndex) => (
                  <Card
                    food={{
                      ...food,
                      id: food._id || `${docIndex}-${categoryIndex}-${itemIndex}` 
                    }}
                    key={food._id || `${docIndex}-${categoryIndex}-${itemIndex}`}
                    step="listing"
                    onAdd={onAdd}
                    onRemove={onRemove}
                    categoryId={category._id}
                    onDelete={handleDeleteItem}
                  />
                ))}
                {/* {Number(userData.id) === Number(allowedId) && (
                  <div className='list-del-div'>
                    <button className='list-del-btn'>delete</button>
                  </div>
                )}  */}
                <div className='list-del-div'>
                    <button className='list-del-btn'>delete</button>
                  </div>
              </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </>
  );
};

export default ListingStep;