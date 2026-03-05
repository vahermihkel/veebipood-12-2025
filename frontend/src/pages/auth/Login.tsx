import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login() {
  const [person, setPerson] = useState({
    "email": "",
    "password": ""
  });
  const navigate = useNavigate();

  function login() {
    fetch(import.meta.env.VITE_HOSTING_URL + `/login`, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        if(!text.includes(" ") && text.split(".").length === 3) {
          navigate("/profile");
          sessionStorage.setItem("token", text);
        } else {
          alert(text);
        }
      });
  }

  return (
    <div>
      <label>Email</label> <br />
      <input onChange={(e) => setPerson({...person, "email": e.target.value})} type="text" /> <br />
      <label>Password</label> <br />
      <input onChange={(e) => setPerson({...person, "password": e.target.value})} type="text" /> <br />
      
      <button onClick={login}>Log in</button>
    </div>
  )
}

export default Login