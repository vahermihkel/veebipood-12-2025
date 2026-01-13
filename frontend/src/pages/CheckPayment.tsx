import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

function CheckPayment() {
  const [urlParams] = useSearchParams();
  const orderReference = urlParams.get("order_reference");
  const paymentReference = urlParams.get("payment_reference");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_HOSTING_URL + `/check-payment?orderReference=${orderReference}&paymentReference=${paymentReference}`)
      .then(res => res.json())
      .then(json => {
        setIsPaid(json.paid);
        setLoading(false);
      })
  }, [orderReference, paymentReference]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isPaid ?
        <div>Order with ID {orderReference} is succesfully paid</div> :
        <div>Order with ID {orderReference} was not paid</div>
      }
    </div>
  )
}

export default CheckPayment



// ?order_reference=eqdsds10&payment_reference=a455530fca9c27837c8627c2db17012dce9d4a014e3ff2c5c80325aa723c5e71
// ?order_reference=eqdsds11&payment_reference=7393d3f226cc7f75e7ff98df87bd66cbf5cf734cadb32fb1abbbded57e596b64
// veebipood-12-2026.web.app/makse?order_reference=TELLIMUSE_NR&payment_reference=MILLEGA_MINNAKSE_EVERYPAYSSE_KÜSIMA_KAS_KÕIK_ON_OK
