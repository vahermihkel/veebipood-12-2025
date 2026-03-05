import { useEffect, useState } from "react"
import { Order } from "../../models/Order";

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + "/my-orders", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setOrders(json))
  }, []);

  return (
    <div>
      {orders.map(order => 
        <div key={order.id}>
          <div>{order.id}</div>
          <div>{order.total}</div>
          <div>{order.created.toString()}</div>
          <div>{order.parcelMachine}</div>
        </div>
      )}
    </div>
  )
}

export default MyOrders