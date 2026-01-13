import { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { Button } from "react-bootstrap";

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({name: ""});

  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json)) // kui teen täpselt ühe rea, pole loogelisi sulge vaja
  }, []);

  function deleteCategory(categoryId: number) {
    fetch(import.meta.env.VITE_HOSTING_URL + "/categories/" + categoryId, {method: "DELETE"})
      .then(res => res.json())
      .then(json => { // kui teen 2 või rohkem rida, on loogelised sulud kohustuslikud
        if (json.message && json.timestamp && json.status) { // minu mudel kuidas ma vigu väljastan
          alert(json.message);
        } else {
          setCategories(json);
        }
      })
  }

  function addCategory() {
    fetch(import.meta.env.VITE_HOSTING_URL + "/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) { 
          alert(json.message);
        } else {
          setCategories(json);
        }
      })
  }

  return (
    <div>
      <div>Kategooriaid kokku: {categories.length}</div>
      <br /><br />

      <label>Kategooria nimi</label> <br />
      <input onChange={(e) => setCategory({name: e.target.value})} type="text" /> <br />
      <button onClick={addCategory}>Lisa uus kategooria</button>

      <br /><br />
      {categories.map(category => 
        <div key={category.id}>
          <div>{category.id}</div>
          <div>{category.name}</div>
          <Button variant="danger" onClick={() => deleteCategory(Number(category.id))}>Kustuta</Button>
        </div>
      )}
    </div>
  )
}

export default ManageCategories