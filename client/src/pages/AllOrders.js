import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/Orders/ordersSlice";
import { Spinner } from "react-bootstrap";
import {DataTable} from "../components";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { ordersLoading, ordersError, allOrderColumns, allOrders } = useSelector(
    (store) => store.orders
  );
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (ordersLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (ordersError) {
    return (<h3>There is some error...</h3>)
  }
  return (
    <div>
      <div>
        <h3>All Order: </h3>
        <hr />
      </div>
      <DataTable columns={allOrderColumns} data={allOrders}/>
    </div>
  );
};
export default AllOrders;
