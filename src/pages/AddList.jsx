// import React from 'react'
// import { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';

// const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;
// const WEB_LINK = import.meta.env.VITE_WEB_LINK;

// const AddList = () => {
        
//     const navigate = useNavigate();

//         const [formData, setFormData] = useState({
//         categoryTitle: "",
//         itemTitle: "",
//         price: "",
//         image: ""
//         });


//         const handleChange = (e) => {
//         const {name,value} = e.target;
//         const copyFormInfo = {...formData};
//         copyFormInfo[name] = value;
//         setFormData(copyFormInfo);
//         }

//     const handleSubmit = async (e) => {
//   e.preventDefault();

//   const payload = {
//     categories: [
//       {
//         title: formData.categoryTitle,
//         items: [
//           {
//             title: formData.itemTitle,
//             price: Number(formData.price),
//             Image: formData.image
//           }
//         ]
//       }
//     ]
//   };

//   try {
//     const response = await fetch(`${RENDER_URL}/list/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     });

//       const text = await response.text();
//       console.log(text);

//   // Try parsing JSON only if text is not empty
//   let result;
//   try {
//     result = text ? JSON.parse(text) : {};
//     console.log(result);
//   } catch (err) {
//     throw new Error("Server returned invalid JSON");
//   }

//     // navigate("/");

//   } catch (err) {
//     console.error("Error adding item:", err);
//   }
// };


//     return (

//     <div>
//         <form onSubmit={handleSubmit}>
//   <input
//     type="text"
//     placeholder="Category Title"
//     value={formData.categoryTitle}
//     // onChange={(e) => setFormData({ ...formData, categoryTitle: e.target.value })}
//     onChange={handleChange}
//   />
//   <input
//     type="text"
//     placeholder="Item Title"
//     value={formData.itemTitle}
//     // onChange={(e) => setFormData({ ...formData, itemTitle: e.target.value })}
//     onChange={handleChange}
//   />
//   <input
//     type="number"
//     placeholder="Price"
//     value={formData.price}
//     // onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//     onChange={handleChange}
//   />
//   <input
//     type="file"
//     placeholder="Image URL (optional)"
//     value={formData.image}
//     // onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//     onChange={handleChange}
//   />
//   <button type="submit">Add Item</button>
// </form>

//     </div>
//   )
// }

// export default AddList


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;
const WEB_LINK = import.meta.env.VITE_WEB_LINK;

const AddList = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryTitle: '',
    itemTitle: '',
    price: '',
    image: '' // Will hold base64 string or image URL
  });

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

      // navigate("/");
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="categoryTitle"
          placeholder="Category Title"
          value={formData.categoryTitle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="itemTitle"
          placeholder="Item Title"
          value={formData.itemTitle}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddList;
