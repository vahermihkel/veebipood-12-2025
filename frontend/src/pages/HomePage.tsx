import { useEffect, useState } from "react";
import type { Product } from "../models/Product";
import type { Category } from "../models/Category";
import { Link } from "react-router-dom";

function HomePage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState("id,asc");
  const [activeCategory, setActiveCategory] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  console.log(products);

  // onLoad funktsioon -> läheb 1x käima
  useEffect(() => {
    fetch(`http://localhost:8080/products?page=${page}&size=${size}&sort=${sort}&categoryId=${activeCategory}`) // kuhu läheb päring (API endpoint)
      .then(res => res.json())    // kogu tagastus: headers, statuscode jne. sisu json-kujule
      .then(json => {
        setProducts(json.content);
        setTotalElements(json.totalElements);
        setTotalPages(json.totalPages);
      })      // body - setin
  }, [page, size, sort, activeCategory]);

  useEffect(() => {
     fetch("http://localhost:8080/categories") 
      .then(res => res.json())    
      .then(json => setCategories(json))      
  }, []);

  function addToCart(product: Product) {
    const productsInCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    productsInCart.push(product);
    localStorage.setItem("cart", JSON.stringify(productsInCart));
  }

  // localStorage ---> brauseri vahemälu mis jääb brauseri
  // sinna ostukorvi lisamiseks peab lisama array:
  // 1. võtma vana seisu või kui vana seisu pole, siis tühjade jutumärkide sees tühi array
  // 2. võtma jutumärgid maha
  // 3. lisama ühe elemendi juurde
  // 4. lisama jutumärgid tagasi
  // 5. lisama localStorage-sse tagasi

  return (
    <div>
      <div>Toodete koguarv: {totalElements}</div>

      <br /><br />

      {categories.map(category => 
        <button key={category.id} onClick={() => setActiveCategory(Number(category.id))}>
          {category.name}
        </button>)
        }

      <br /><br />

      <div>Sorteeri:</div>
      <button onClick={() => setSort("id,asc")}>Vanemad ees</button>
      <button onClick={() => setSort("id,desc")}>Uuemad ees</button>
      <button onClick={() => setSort("name,asc")}>Nimi A-Z</button>
      <button onClick={() => setSort("name,desc")}>Nimi Z-A</button>
      <button onClick={() => setSort("price,asc")}>Hind kasvavalt</button>
      <button onClick={() => setSort("price,desc")}>Hind kahanevalt</button>

      <br /><br />

      <div>Toodete arv lehel:</div>
      <select onChange={(e) => setSize(Number(e.target.value))} defaultValue="2">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>

      <br /><br />

      {products.map(product => 
        <div key={product.id}>
          <div>{product.name}</div>
          <div>{product.price}€</div>
          <button onClick={() => addToCart(product)}>Lisa ostukorvi</button>
          <Link to={"/toode/" + product.id}>
            <button>Vaata lähemalt</button>
          </Link>
        </div>)}
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine leht</button>
      <span>{page+1}</span>
      <button disabled={page+1 >= totalPages} onClick={() => setPage(page + 1)}>Järgmine leht</button>

    </div>
  )
}

export default HomePage