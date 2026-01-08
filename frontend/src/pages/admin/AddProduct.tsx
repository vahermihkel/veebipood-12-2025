import { useEffect, useState } from "react"
import type { Product } from "../../models/Product"
import { ToastContainer, toast } from 'react-toastify';
import { Category } from "../../models/Category";

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    "name": "", "price": 0, "stock": 0, active: false, category: {"id": 1, "name": ""}
  })
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
     fetch("http://localhost:8080/categories") 
      .then(res => res.json())    
      .then(json => setCategories(json))   
  }, []);

  function addProduct() {
    fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(() => toast.success("Edukalt toode lisatud"))
  }

  return (
    <div>
      <label>Name</label> <br />
      <input onChange={(e) => setProduct({...product, "name": e.target.value})} type="text" /> <br />
      <label>Price</label> <br />
      <input onChange={(e) => setProduct({...product, "price": Number(e.target.value)})} type="text" /> <br />
      <label>Stock</label> <br />
      <input onChange={(e) => setProduct({...product, "stock": Number(e.target.value)})} type="text" /> <br />
      <label>Kategooria</label> <br />
      <select
        onChange={(e) => {
          setProduct({
            ...product,
            category: { id: Number(e.target.value), name: "" },
          });
        }}
      >
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <br />
      <label>Active</label> <br />
      <input onChange={(e) => setProduct({...product, "active": e.target.checked})} type="checkbox" /> <br />
      <button onClick={() => addProduct()}>Add product</button>
      <ToastContainer />
    </div>
  )
}

export default AddProduct