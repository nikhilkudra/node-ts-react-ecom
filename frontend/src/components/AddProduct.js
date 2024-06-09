// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const AddProduct = () => {
//   const [name, setName] = React.useState("");
//   const [price, setPrice] = React.useState("");
//   const [category, setCategory] = React.useState("");
//   const [image, setImage] = React.useState("");
//   const [error, setError] = React.useState(false);
//   const navigate = useNavigate();
//   const auth = localStorage.getItem("token");
//   const addProduct = async () => {
//     try {
//       if (!name || !price || !category) {
//         setError(true);
//         return false;
//       }
//       let imageUrl =''
//       if(!image || image== undefined) image ='https://via.placeholder.com/150'
//       console.log(name, price, category, imageUrl,"sdddddddddddd");
//       let result = await fetch("http://localhost:3000/api/products", {
//         method: "post",
//         body: JSON.stringify({ name, price, category, imageUrl }),
//         headers: {
//           "Content-type": "application/json",
//           Authorization: JSON.parse(auth),
//         },
//       });
//       navigate("/");
//     } catch (error) {
//         if (error.response) {
//             toast.error(error.response.data.error || error.response.data.Message);
//           } else if (error.request) {
//             toast.error(
//               "No response received from server. Please try again later."
//             );
//           } else {
//             toast.error("An unexpected error occurred. Please try again.");
//           }    }
//   };

//   return (
//     <div className="product">
//       <h1 className="add-product">Add Product</h1>
//       <input
//         type="text"
//         placeholder="Enter product name"
//         className="inputBox"
//         value={name}
//         onChange={(e) => {
//           setName(e.target.value);
//         }}
//       />
//       {error && !name && (
//         <span className="invalid-input">Enter valid name</span>
//       )}

//       <input
//         type="text"
//         placeholder="Enter product price"
//         className="inputBox"
//         value={price}
//         onChange={(e) => {
//           setPrice(e.target.value);
//         }}
//       />
//       {error && !price && (
//         <span className="invalid-input">Enter valid price</span>
//       )}

//       <input
//         type="text"
//         placeholder="Enter product category"
//         className="inputBox"
//         value={category}
//         onChange={(e) => {
//           setCategory(e.target.value);
//         }}
//       />
//       {error && !category && (
//         <span className="invalid-input">Enter valid category</span>
//       )}

//       <input
//         type="text"
//         placeholder="Enter Image URL"
//         className="inputBox"
//         value={image}
//         onChange={(e) => {
//           setImage(e.target.value);
//         }}
//       />
//       <button onClick={addProduct} className="appButton">
//         Add Product
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddProduct;




import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState({});
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  const addProduct = async () => {
    try {
      let currentError = {};
      if (!name) {
        currentError.name = "Enter valid name";
      }
      if (!price || isNaN(price)) {
        currentError.price = "Enter valid price";
      }
      if (!category) {
        currentError.category = "Enter valid category";
      }
      setError(currentError);

      if (Object.keys(currentError).length > 0) {
        return;
      }

      let imageUrl = image || 'https://via.placeholder.com/150';
      console.log(name, price, category, imageUrl, "sdddddddddddd");

      let result = await fetch("http://localhost:3000/api/products", {
        method: "post",
        body: JSON.stringify({ name, price, category, imageUrl }),
        headers: {
          "Content-type": "application/json",
          Authorization: JSON.parse(auth),
        },
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || error.response.data.Message);
      } else if (error.request) {
        toast.error(
          "No response received from server. Please try again later."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="product">
      <h1 className="add-product">Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error.name && (
        <span className="invalid-input">{error.name}</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error.price && (
        <span className="invalid-input">{error.price}</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error.category && (
        <span className="invalid-input">{error.category}</span>
      )}

      <input
        type="text"
        placeholder="Enter Image URL"
        className="inputBox"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
