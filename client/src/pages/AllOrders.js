import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/Orders/ordersSlice";
import { Spinner } from "react-bootstrap";
import { DataTable, WrapperCard } from "../components";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { status, allOrderColumns, allOrdersFormatedData } = useSelector(
    (store) => store.orders
  );
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (status.getAllOrders.loading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (status.getAllOrders.error) {
    return <h3>There is some error...</h3>;
  }
  return (
    <WrapperCard>
      <div>
        <div>
          <h3>All Order: </h3>
          <hr />
        </div>
        <DataTable columns={allOrderColumns} data={allOrdersFormatedData} />
      </div>
    </WrapperCard>
  );
};
export default AllOrders;
