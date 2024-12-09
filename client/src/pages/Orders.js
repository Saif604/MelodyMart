import { useEffect } from "react";
import { DataTable } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserOrders } from "../features/Orders/ordersSlice";
import { Spinner } from "react-bootstrap";
import { TbEye } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import OrderModal from "../components/Modals/OrderModal";
import { closeModal, openModal } from "../features/Modal/modalSlice";

const Orders = () => {
  const {
    ordersLoading,
    ordersError,
    currentUserOrders,
    currentUserOrderColumns,
    totalCurrentUserOrder,
  } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCurrentUserOrders());
  }, [dispatch]);

  useEffect(() => {
    const modalData =
      currentUserOrders.find((order) => order?._id === id) || {}; 
    if (id) {
      dispatch(openModal(modalData));
    }
  }, [id, dispatch, currentUserOrders]);

  const handleModalOpen = (order) => {
    dispatch(openModal({ ...order }));
  };
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const tableData = currentUserOrders.map((order) => {
    const newOrder = { ...order };
    if (order._id) {
      newOrder._id = (
        <div className="d-flex align-items-center justify-content-between">
          <span>{order._id}</span>
          <Link
            to={`/dashboard/orders`}
            className="icon"
            onClick={() => handleModalOpen(order)}
          >
            <TbEye />
          </Link>
        </div>
      );
    }
    return newOrder;
  });

  if (ordersLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (ordersError) {
    return <h3>There is some error...</h3>;
  }
  if (!totalCurrentUserOrder) {
    return <h3>No order placed</h3>;
  }
  return (
    <div>
      <div>
        <h4>
          Orders:
          <hr />
        </h4>
      </div>
      <DataTable columns={currentUserOrderColumns} data={tableData} />
      <OrderModal closeModal={handleModalClose} />
    </div>
  );
};
export default Orders;
