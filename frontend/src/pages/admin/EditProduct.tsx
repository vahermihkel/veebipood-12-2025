import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { Product } from "../../models/Product";
import { ToastContainer, toast } from 'react-toastify';

function EditProduct() {
  // siin loogeliste sulgude sees on see muutuja mis on App.jsx-s kooloni järel
  // <Route path="/toode/:product_id" element={ <SingleProduct /> } />

  // Reacti Hook --> Reacti erikood
  // 1. alati algab use- eesliidesega
  // 2. alati tuleb importida
  // 3. alati tuleb käima tõmmata (ehk sulud on lõpus)
  // 4. ei tohi olla funktsiooni sees käivitada (luua)
  // 5. ei tohi tingimuslikult käivitada (luua)

  // renderdamine -> HTMLi esmakordne väljakuvamine
  // re-renderdamine -> HTMLi uuendamine useState setteri abil

  // Reacti Hooki mõte on see, et teda luuakse täpselt 1x
  // ja kui re-renderdatakse (HTMLi uuendatakse), siis teda ei looda
  //   kui re-renderdatakse, siis kõik muu peale hookide käivitub

  const { product_id } = useParams();
  const [product, setProduct] = useState<Product>({
    "name": "", "price": 0, "stock": 0, active: false, category: {"id": 1, "name": ""}
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // JavaScriptis suunamiseks

  // Vanilla JavaScript
  // HTMLs suunata: <a href="/">
  // JavaScriptis suunata: window.location.href =

  // Reactis
  // HTMLs suunata: <Link to="/"
  // JavaSriptis suunata: const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + "/products/" + product_id)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setLoading(false);
      })
  }, [product_id]);
  // useEffecti dependency array -> kuhu lähevad kõik välised muutujad
  // kui see muutuja muutub, siis läheb useEffect uuesti käima

  function edit() {
    if (product?.name === "") {
      toast.error("Ei saa lisada tühja nimega!");
      return;
    }
    if (product?.price <= 0) {
      toast.error("Hind peab olema suurem kui null!");
      return;
    }
     fetch(import.meta.env.VITE_HOSTING_URL + "/products", {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(() => navigate("/admin/halda-tooteid"))
  }

  if (loading) {
    // loading spinner
    return <div></div>
  }

  if (product === undefined) {
    return <div>Product not found</div>
  }

  return (
    <div>
      {/* <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.stock}</div>
      <div>{product.category?.name}</div>
      <div>{product.active ? "Aktiivne" : "Mitteaktiivne"}</div> */}

      <label>Name</label> <br />
      <input defaultValue={product.name} onChange={(e) => setProduct({...product, "name": e.target.value})} type="text" /> <br />
      <label>Price</label> <br />
      <input defaultValue={product.price} onChange={(e) => setProduct({...product, "price": Number(e.target.value)})} type="text" /> <br />
      <label>Stock</label> <br />
      <input defaultValue={product.stock} onChange={(e) => setProduct({...product, "stock": Number(e.target.value)})} type="text" /> <br />
      <label>Active</label> <br />
      <input defaultChecked={product.active} onChange={(e) => setProduct({...product, "active": e.target.checked})} type="checkbox" /> <br />
      {/* <Link to="/admin/halda-tooteid"> */}
      <button onClick={() => edit()}>Edit product</button>
      {/* </Link> */}

      <ToastContainer />
    </div>
  )
}

export default EditProduct