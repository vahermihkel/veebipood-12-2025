import { useState } from "react"
import type { Person } from "../../models/Person"
import { useNavigate } from "react-router-dom";

function Signup() {
  const [person, setPerson] = useState<Person>({
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "role": "CUSTOMER"
  });
  const roles = ["CUSTOMER", "ADMIN", "SUPERADMIN"];
  const navigate = useNavigate(); // <--- Reactis suunamiseks
  // makses: window.location.href <--- rakendusest välja suunamiseks (Reactis teeks refreshi)

  function signup() {
    fetch(import.meta.env.VITE_HOSTING_URL + `/signup`, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => navigate("/login"));
  }

  return (
    <div>
      <label>First name</label> <br />
      <input onChange={(e) => setPerson({...person, "firstName": e.target.value})} type="text" /> <br />
      <label>Last name</label> <br />
      <input onChange={(e) => setPerson({...person, "lastName": e.target.value})} type="text" /> <br />
      <label>Email</label> <br />
      <input onChange={(e) => setPerson({...person, "email": e.target.value})} type="text" /> <br />
      <label>Password</label> <br />
      <input onChange={(e) => setPerson({...person, "password": e.target.value})} type="text" /> <br />
      <select
        defaultValue={""}
        onChange={(e) => setPerson({ ...person, role: e.target.value })}
      >
        {roles.map((roleName, index: number) => (
          <option key={index} value={roleName}>
            {roleName}
          </option>
        ))}
      </select>
      <button onClick={signup}>Sign up</button>
    </div>
  )
}

export default Signup