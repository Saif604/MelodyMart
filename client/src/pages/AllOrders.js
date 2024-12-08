import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/AllOrders/allOrdersSlice";
import { Spinner } from "react-bootstrap";
import {DataTable} from "../components";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, tableColumns, allOrders } = useSelector(
    (store) => store.allOrders
  );
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (isError) {
    return (<h3>There is some error...</h3>)
  }
  return (
    <div>
      <div>
        <h3>All Order: </h3>
        <hr />
      </div>
      <DataTable columns={tableColumns} data={allOrders}/>
    </div>
  );
};
export default AllOrders;
