
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

import pizzaImg from '../assets/img/pizza.png';
const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;
const WEB_LINK = import.meta.env.VITE_WEB_LINK;

const AddList = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryTitle: '',
    itemTitle: '',
    price: '',
    image: '' 
  });


  //   const handleChange = (e) => {
  //   const title = formData.categoryTitle;
  //   const src = 
  //   setFormData
  // }


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file); // convert to base64
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      categories: [
        {
          title: formData.categoryTitle,
          items: [
            {
              title: formData.itemTitle,
              price: Number(formData.price),
              Image: formData.image
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(`${RENDER_URL}/server/list/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      console.log(text);

      let result;
      try {
        result = text ? JSON.parse(text) : {};
        console.log(result);
      } catch (err) {
        throw new Error('Server returned invalid JSON');
      }

      navigate("/");
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
  {/* <input
    type="text"
    name="categoryTitle"
    placeholder="Category Title"
    value={formData.categoryTitle}
    onChange={handleChange}
    className="form-input"
  /> */}
  <select
   name="categoryTitle"
   className="form-input"
   placeholder="Category Title"
   value={formData.categoryTitle}
   onChange={handleChange}
   style={{color : "gray"}}
   
   >
    <option value="" disabled selected style={{color : "gray"}}>Select the category</option>
    <option value="Pizza">Pizza</option>
    <option value="Burger">Burger</option>
    <option value="Cool Drinks">Cool Drinks</option>
    <option value="Hot Drinks">Hot Drinks</option>
    <option value="Sandwichs">Sandwichs</option>
    <option value="Snacks/Chaats">Snacks/Chaats</option>
    <option value="Frankie Roll">Frankie Roll</option>
    <option value="Noodles">Noodles</option>
   </select>
  <input
    type="text"
    name="itemTitle"
    placeholder="Item Title"
    value={formData.itemTitle}
    onChange={handleChange}
    className="form-input"
  />
  <input
    type="number"
    name="price"
    placeholder="Price"
    value={formData.price}
    onChange={handleChange}
    className="form-input"
  />
  {/* <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
    className="form-input"
  /> */}
  <button type="submit" className="form-button">
    Add Item
  </button>
</form>
</div>
  );
};

export default AddList;
