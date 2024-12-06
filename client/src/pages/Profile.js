import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { LineChart, BarChart, ProfileWizard, DonutChart } from "../components";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getCurrentUserOrders,
  updateUser,
  updateUserPassword,
} from "../features/Profile/profileSlice";
import { closeModal, openModal } from "../features/Modal/modalSlice";
import { EditUser } from "../components/Modals";

const Profile = () => {
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, currentUser, lineData, barData, donutData } =
    useSelector((store) => store.profile);
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
    }
    else{
      dispatch(updateUserPassword(userData))
        .then(() => {
          dispatch(getCurrentUser());
          dispatch(closeModal());
        })
        .catch((err) => console.error(err));
    }
  };

  if (isLoading) {
    return <div className="page flx-cntr">
      <Spinner animation="grow" className="loadder"/>
    </div>
  }
  if (isError) {
    return <h3>There is some error...</h3>;
  }

  return (
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
            <BarChart data={barData} />
          </div>
        </Col>
        <Col md={6}>
          <div className="card">
            <LineChart data={lineData} />
          </div>
        </Col>
        <Col md={6}>
          <div className="card">
            <DonutChart data={donutData} />
          </div>
        </Col>
      </Row>
      {show && (
        <EditUser handleUpdate={handleUpdate} isPasswordEdit={isPasswordEdit} />
      )}
    </Wrapper>
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
