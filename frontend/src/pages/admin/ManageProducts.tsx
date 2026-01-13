import { useEffect, useState } from "react"
import type { Product } from "../../models/Product";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      fetch(import.meta.env.VITE_HOSTING_URL + "/admin-products") // kuhu läheb päring (API endpoint)
        .then(res => res.json())    // kogu tagastus: headers, statuscode jne. sisu json-kujule
        .then(json => setProducts(json))      // body - setin  
    }, []);

  function deleteProduct(productId: number) {
    fetch(import.meta.env.VITE_HOSTING_URL + "/products/" + productId, {
      method: "DELETE"
    }) 
        .then(res => res.json())  
        .then(json => setProducts(json))   
  }

  return (
    <div>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Active</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => 
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.active ? "Aktiivne" : "Mitteaktiivne"}</td>
              <td>{product.stock}</td>
              <td>{product.category?.name}</td>
              <td><button onClick={() => deleteProduct(Number(product.id))}>Kustuta</button></td>
              <td>
                <Link to={"/admin/muuda-toode/" + product.id}>
                  <button>Muuda</button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ManageProducts