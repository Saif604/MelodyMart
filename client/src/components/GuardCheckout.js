import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const GuardCheckout = ({children}) => {
    const {orderCheckout} = useSelector((store)=>store.orders);
    if(!orderCheckout){
        return <Navigate to="/dashboard/cart"/>
    }
  return children;
}
export default GuardCheckout