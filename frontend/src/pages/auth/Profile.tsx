import { useEffect, useState } from "react";
import type { Person } from "../../models/Person";

function Profile() {
  const [person, setPerson] = useState<Person>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + "/profile", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setPerson(json))
  }, []);

  function updateProfile() {
    fetch(import.meta.env.VITE_HOSTING_URL + "/profile", {
      method: "PUT",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          alert(json.message);
        } else {
          setPerson(json)
        }
      })
  }

  if (person.id === null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <label>Eesnimi</label> <br />
      <input value={person.firstName} onChange={(e) => setPerson({...person, firstName: e.target.value})} type="text" /> <br />
      <label>Perenimi</label> <br />
      <input value={person.lastName} onChange={(e) => setPerson({...person, lastName: e.target.value})} type="text" /> <br />
      <label>Email</label> <br />
      <input value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} type="text" /> <br />
      <button onClick={updateProfile}>Uuenda profiili</button>
    </div>
  )
}

export default Profile