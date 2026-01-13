import { useState } from "react"
import { Product } from "../models/Product";
import ParcelMachines from "../components/ParcelMachines";

function Cart() { 
  const [cart, setCart] = useState<Product[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [selectedPM, setSelectedPM] = useState("");

  // kustutamine
  function removeProduct(index: number) {
    cart.splice(index,1); // .splice ---> kustutamine. esimene nr mitmendat, teine nr mitu tk
    setCart(cart.slice()); // HTMLi uuendamine
    localStorage.setItem("cart", JSON.stringify(cart)); // LocalStorage-i uuendamine
  }

  // tühjendamine
  function empty() {
    setCart([]);
    localStorage.setItem("cart", "[]");
  }

  // ostukorvi summa kokkuarvutamine
  function cartSum() {
    let sum = 0;
    cart.forEach(product => sum += product.price);
    return sum;
  }

  // api endpointi kaudu tellimuse sisestamine
  function order() {
    fetch(import.meta.env.VITE_HOSTING_URL + `/orders?pmName=${selectedPM}&personId=1`, {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(json => window.location.href = json.link);
  }

  return (
    <div>
      <button onClick={empty}>Tühjenda</button>

      {cart.map((product, index) => 
        <div key={index}>
          <span>{product.name} - </span>
          <span>{product.price.toFixed(2)}€</span>
          <button onClick={() => removeProduct(index)}>x</button>
        </div>
      )}

      <div>Kokku: {cartSum().toFixed(2)} €</div>
      <br />
      <ParcelMachines setSelectedPM={setSelectedPM} />
      <br />
      <button disabled={cartSum() >= 7000} onClick={order}>Telli</button>
      {cartSum() >= 7000 && <div>Ostukorvi summa liiga suur! Jaota tellimus mitmesse osasse</div>}
    </div>
  )
}

export default Cart