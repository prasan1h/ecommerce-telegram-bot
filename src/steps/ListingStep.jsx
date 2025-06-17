// // 


// // steps/ListingStep.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Card from "../components/card";
// import Cart from "../components/cart";
// import '../assets/style.css';

// const RENDER_EXTERNAL_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;

// const ListingStep = ({ 
//   userData, 
//   cartItems, 
//   onAdd, 
//   onRemove, 
//   setStep, 
//   allowedId 
// }) => {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);



// useEffect(() => {
//   const fetchFoods = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${RENDER_EXTERNAL_URL}/server/read/foods`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });

//       // Validate JSON response
//       const contentType = response.headers.get('content-type');
//       if (!response.ok || !contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         console.error('Invalid response body:', text.slice(0, 200));
//         throw new Error('Invalid response format');
//       }

//       const data = await response.json();
//       setFoods(data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching foods:', err);
//       setError('Failed to load food items. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchFoods();
// }, []);


//   // Loading state
//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner">Loading delicious food items...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="error-container">
//         <h2>Oops! Something went wrong</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   // No data state
//   if (!foods || foods.length === 0) {
//     return (
//       <div className="no-data-container">
//         <h2>No food items available</h2>
//         <p>Please check back later or contact support.</p>
//       </div>
//     );
//   }










//   const handleDeleteItem = (itemId, categoryId) => {
//     // Remove item from UI immediately for better UX
//     setFoods(prevData => 
//       prevData.map(category => {
//         if (category._id === categoryId) {
//           return {
//             ...category,
//             items: category.items.filter(item => item._id !== itemId)
//           };
//         }
//         return category;
//       })
//     );
//     window.location.reload()
//   };













//   return (
//     <>
//       {userData.firstName && (
//         <h1 className="heading">Hello, {userData.firstName}</h1>
//       )}

//       <div className="addlink-div">
//         {Number(userData.id) === Number(allowedId) && (
//           <Link to="/add" className="add-link">
//             ➕ Add List
//           </Link>
//         )}
//       </div>

//       <h1 className="heading">Order Food</h1>

//       <Cart cartItems={cartItems} onCheckout={() => setStep('checkout')} />
      
//       {/* <div className="cards__container">
//         {foods.map((foodDoc, docIndex) => (
//           foodDoc.categories && foodDoc.categories.map((category, categoryIndex) => (
//             <div key={`${docIndex}-${categoryIndex}`} className="category__block">
//               <h2 className="category__heading">{category.title}:</h2>
              
//               <div className="cards__inner__wrap">
//                 <div className='card-del-div'>
//                 {category.items && category.items.map((food, itemIndex) => (
//                   <Card
//                     food={{
//                       ...food,
//                       id: food._id || `${docIndex}-${categoryIndex}-${itemIndex}` 
//                     }}
//                     key={food._id || `${docIndex}-${categoryIndex}-${itemIndex}`}
//                     step="listing"
//                     onAdd={onAdd}
//                     onRemove={onRemove}
//                     categoryId={category._id}
//                     onDelete={handleDeleteItem}
//                   />
//                 ))}
                
//               </div>
//               </div>
//             </div>
//           ))
//         ))}
//       </div> */}





//       {/* <div className="cards__container">
//   {
//     // Step 1: Flatten all categories from all foodDocs into a single list
//     foods
//       .flatMap(foodDoc => foodDoc.categories || [])
//       .filter(category => category.items && category.items.length > 0) // Skip empty categories
//       .reduce((acc, category) => {
//         if (!acc[category.title]) {
//           acc[category.title] = [];
//         }
//         acc[category.title].push({ ...category });
//         return acc;
//       }, {}) // Step 2: Group by category title
//   }
//   {
//     Object.entries(
//       foods
//         .flatMap(foodDoc => foodDoc.categories || [])
//         .filter(category => category.items && category.items.length > 0)
//         .reduce((acc, category) => {
//           if (!acc[category.title]) {
//             acc[category.title] = [];
//           }
//           acc[category.title].push({ ...category });
//           return acc;
//         }, {})
//     ).map(([title, categoryGroup], index) => (
//       <div key={index} className="category__block">
//         <h2 className="category__heading">{title}:</h2>
//         <div className="cards__inner__wrap">
//           <div className="card-del-div">
//             {
//               categoryGroup
//                 .flatMap(cat => cat.items)
//                 .map((food, itemIndex) => (
//                   <Card
//                     food={{ ...food, id: food._id || `${index}-${itemIndex}` }}
//                     key={food._id || `${index}-${itemIndex}`}
//                     step="listing"
//                     onAdd={onAdd}
//                     onRemove={onRemove}
//                     categoryId={categoryGroup[0]._id} // This can vary if categories are from different docs
//                     onDelete={handleDeleteItem}
//                   />
//                 ))
//             }
//           </div>
//         </div>
//       </div>

//     ))
//   }
// </div> */}











// <div className="cards__container">
//   {
//     // Step 1: Group items by category title
//     Object.entries(
//       foods
//         .filter(cat => Array.isArray(cat.items) && cat.items.length > 0)
//         .reduce((grouped, cat) => {
//           const title = cat.title;
//           if (!grouped[title]) {
//             grouped[title] = [];
//           }
//           grouped[title].push(...cat.items.map(item => ({
//             ...item,
//             categoryId: cat._id // store for deletion
//           })));
//           return grouped;
//         }, {})
//     ).map(([title, items], index) => (
//       <div key={index} className="category__block">
//         <h2 className="category__heading">{title}:</h2>
//         <div className="cards__inner__wrap">
//           <div className="card-del-div">
//             {items.map((food, itemIndex) => (
//               <Card
//                 key={food._id || `${index}-${itemIndex}`}
//                 food={{ ...food, id: food._id }}
//                 step="listing"
//                 onAdd={onAdd}
//                 onRemove={onRemove}
//                 categoryId={food.categoryId}
//                 onDelete={handleDeleteItem}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     ))
//   }
// </div>













//     </>
//   );
// };

// export default ListingStep;



// steps/ListingStep.jsx
// steps/ListingStep.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from "../components/card";
import Cart from "../components/cart";
import '../assets/style.css';
// import '../assets/style/ListingStep.css';

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

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Invalid response body:', text.slice(0, 200));
          throw new Error('Invalid response format');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        console.log('Data structure check:');
        if (Array.isArray(data) && data.length > 0) {
          console.log('First document:', data[0]);
          if (data[0].categories) {
            console.log('Categories in first document:', data[0].categories);
            if (data[0].categories[0]) {
              console.log('First category:', data[0].categories[0]);
              console.log('Items in first category:', data[0].categories[0].items);
            }
          }
        }
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

  // Group categories by title and merge items
  const groupedCategories = React.useMemo(() => {
    if (!Array.isArray(foods) || foods.length === 0) {
      return {};
    }

    return foods.reduce((grouped, foodDoc) => {
      // Access the categories array within each food document
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

          // Add all items from this category
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
        {console.log('Grouped categories:', groupedCategories)}
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
                        food={{ ...food, id: food._id }}
                        step="listing"
                        onAdd={onAdd}
                        onRemove={onRemove}
                        categoryId={food.categoryId}
                        onDelete={handleDeleteItem}
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