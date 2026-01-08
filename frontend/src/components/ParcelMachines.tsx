import { useEffect, useState } from "react";
import { ParcelMachine } from "../models/ParcelMachine";

function ParcelMachines(props) {
  const [parcelmachines, setParcelMachines] = useState<ParcelMachine[]>([]);

  // uef
  useEffect(() => {
    fetch("http://localhost:8080/parcelmachines")
      .then(res => res.json())
      .then(json => setParcelMachines(json))
  }, []);


  return (
    <select onChange={(e) => props.setSelectedPM(e.target.value)}>
      {parcelmachines.map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
    </select>
  )
}

export default ParcelMachines