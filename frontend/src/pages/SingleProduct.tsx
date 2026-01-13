import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Product } from "../models/Product";

function SingleProduct() {
  // siin loogeliste sulgude sees on see muutuja mis on App.jsx-s kooloni järel
  // <Route path="/toode/:product_id" element={ <SingleProduct /> } />

  const { product_id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + "/products/" + product_id)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
      })
  }, [product_id]);
  // useEffecti dependency array -> kuhu lähevad kõik välised muutujad
  // kui see muutuja muutub, siis läheb useEffect uuesti käima

  if (product === undefined) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.stock}</div>
      <div>{product.category?.name}</div>
      <div>{product.active ? "Aktiivne" : "Mitteaktiivne"}</div>
    </div>
  )
}

export default SingleProduct