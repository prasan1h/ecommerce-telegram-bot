
import React, { useState, useEffect } from 'react';
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
  allowedId ,
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

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
          const text = await response.text();
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


  const groupedCategories = React.useMemo(() => {
    if (!Array.isArray(foods) || foods.length === 0) {
      return {};
    }

    return foods.reduce((grouped, foodDoc) => {

      if (foodDoc.categories && Array.isArray(foodDoc.categories)) {
        foodDoc.categories.forEach(category => {
          if (!category || !category.title) {
            return;
          }

          const title = category.title;
          if (!grouped[title]) {
            grouped[title] = {
              title: title,
              items: [],
              _id: category._id
            };
          }

          if (category.items && Array.isArray(category.items)) {
            const itemsWithCategoryId = category.items.map(item => ({
              ...item,
              categoryId: category._id
            }));
            grouped[title].items.push(...itemsWithCategoryId);
          }
        });
      }

      return grouped;
    }, {});
  }, [foods]);

  const handleDeleteItem = (itemId, categoryId) => {
    setFoods(prevData => 
      prevData.map(foodDoc => ({
        ...foodDoc,
        categories: foodDoc.categories.map(category => {
          if (category._id === categoryId) {
            return {
              ...category,
              items: category.items.filter(item => item._id !== itemId)
            };
          }
          return category;
        })
      }))
    );
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading delicious food items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button className='reloadbtn' onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!foods || foods.length === 0) {
    return (
      <>
      <div className="addlink-div">
        {Number(userData.id) === Number(allowedId) && (
          <Link to="/add" className="add-link">
            ➕ Add List
          </Link>
        )}
      </div>
      <div className="no-data-container">
        <h2>No food items available</h2>
        <p>Please check back later or contact support.</p>
      </div>
      </>
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
            ➕ 
          </Link>
         )} 

        {Number(userData.id) === Number(allowedId) && (
        <Link to="/readorder" className="add-link">
            🧾  
          </Link>
        )} 
        <Link to="/notify" className="add-link">
            🔔
          </Link>
      </div>

      <h1 className="heading">Order Food</h1>

      <Cart cartItems={cartItems} onCheckout={() => setStep('checkout')} />
      
      <div className="cards__container">
        {Object.keys(groupedCategories).length === 0 ? (
          <div>No categories found</div>
        ) : (
          Object.values(groupedCategories).map((category, index) => (
            <div key={index} className="category__block">
              <h2 className="category__heading">{category.title}:</h2>
              <div className="cards__inner__wrap">
                <div className="card-del-div">
                  {category.items && category.items.length > 0 ? (
                    category.items.map((food, itemIndex) => (
                      <Card
                        key={food._id || `${index}-${itemIndex}`}
                        food={{ ...food, id: food._id, categoryTitle: category.title  }}
                        step="listing"
                        onAdd={onAdd}
                        onRemove={onRemove}
                        categoryId={food.categoryId}
                        onDelete={handleDeleteItem}
                        user={userData.id} 
                      />
                    ))
                  ) : (
                    <div>No items in this category</div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListingStep;