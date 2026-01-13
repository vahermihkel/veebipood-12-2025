import { useEffect, useState } from "react";
import { ParcelMachine } from "../models/ParcelMachine";

interface ParcelMachineInterface {
  setSelectedPM: (arg: string) => void;
}

function ParcelMachines(props: ParcelMachineInterface) {
  const [parcelmachines, setParcelMachines] = useState<ParcelMachine[]>([]);

  // uef
  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + "/parcelmachines")
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