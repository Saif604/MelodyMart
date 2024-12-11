import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import styled from "styled-components";
import {
  LineChart,
  BarChart,
  ProfileWizard,
  DonutChart,
  WrapperCard,
} from "../components";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateUser,
  updateUserPassword,
} from "../features/User/userSlice";
import { getCurrentUserOrders } from "../features/Orders/ordersSlice";
import { closeModal, openModal } from "../features/Modal/modalSlice";
import { EditUser } from "../components/Modals";
import { formatBar, formatDonut, formatLine } from "../utils/format";

const Profile = () => {
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const dispatch = useDispatch();
  const { status: userStatus, currentUser } = useSelector(
    (store) => store.users
  );
  const { status: orderStatus, currentUserOrders } = useSelector(
    (store) => store.orders
  );
  const { show } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCurrentUserOrders());
  }, [dispatch]);

  const handleEdit = (isPasswordEdit) => {
    setIsPasswordEdit(isPasswordEdit);
    dispatch(openModal(currentUser));
  };

  const handleUpdate = (userData) => {
    if (!isPasswordEdit) {
      dispatch(updateUser(userData))
        .then(() => {
          dispatch(getCurrentUser());
          dispatch(closeModal());
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(updateUserPassword(userData))
        .then(() => {
          dispatch(getCurrentUser());
          dispatch(closeModal());
        })
        .catch((err) => console.error(err));
    }
  };

  if (
    userStatus.getCurrentUser.loading ||
    orderStatus.getCurrentUserOrders.loading
  ) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (
    userStatus.getCurrentUser.error ||
    orderStatus.getCurrentUserOrders.error
  ) {
    return <h3>There is some error...</h3>;
  }
  return (
    <WrapperCard>
      <Wrapper>
        <div>
          <h4>Profile</h4>
          <hr />
        </div>
        <Row className="gy-3">
          <Col sm={6} lg={4}>
            <div className="card">
              <ProfileWizard user={currentUser} handleEdit={handleEdit} />
            </div>
          </Col>
          <Col sm={12} md={6} lg={8}>
            <div className="card">
              <BarChart data={formatBar(currentUserOrders)} />
            </div>
          </Col>
          <Col md={6}>
            <div className="card">
              <LineChart data={formatLine(currentUserOrders)} />
            </div>
          </Col>
          <Col md={6}>
            <div className="card">
              <DonutChart data={formatDonut(currentUserOrders)} />
            </div>
          </Col>
        </Row>
        {show && (
          <EditUser
            handleUpdate={handleUpdate}
            isPasswordEdit={isPasswordEdit}
            updateStatus={userStatus}
          />
        )}
      </Wrapper>
    </WrapperCard>
  );
};
export default Profile;

const Wrapper = styled.div`
  .card {
    padding: 0.5rem;
    box-shadow: var(--dark-shadow);
    border: 1px solid #f5f5f5;
    height: 100%;
  }
  svg {
    width: 100%;
  }
`;
