import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;
const WEB_LINK = import.meta.env.VITE_WEB_LINK;

const AddList = () => {
        
    const navigate = useNavigate();

        const [formData, setFormData] = useState({
        categoryTitle: "",
        itemTitle: "",
        price: "",
        image: ""
        });


        const handleChange = (e) => {
        const {name,value} = e.target;
        const copyProdInfo = {...prodInfo};
        copyProdInfo[name] = value;
        setProdInfo(copyProdInfo);
        }

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
    const response = await fetch(`${RENDER_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

      const text = await response.text();

  // Try parsing JSON only if text is not empty
  let result;
  try {
    result = text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error("Server returned invalid JSON");
  }

    navigate("/");

  } catch (err) {
    console.error("Error adding item:", err);
  }
};


    return (

    <div>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Category Title"
    value={formData.categoryTitle}
    onChange={(e) => setFormData({ ...formData, categoryTitle: e.target.value })}
  />
  <input
    type="text"
    placeholder="Item Title"
    value={formData.itemTitle}
    onChange={(e) => setFormData({ ...formData, itemTitle: e.target.value })}
  />
  <input
    type="number"
    placeholder="Price"
    value={formData.price}
    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
  />
  <input
    type="file"
    placeholder="Image URL (optional)"
    value={formData.image}
    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
  />
  <button type="submit">Add Item</button>
</form>

    </div>
  )
}

export default AddList