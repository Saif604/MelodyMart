import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getAllUsers } from "../features/User/userSlice";
import { DataTable, WrapperCard } from "../components";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { status, allUsersTableData, allUsersTableColumns } = useSelector(
    (store) => store.users
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (status.getAllUsers.loading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (status.getAllUsers.error) {
    return <h3>There is some error....</h3>;
  }
  return (
    <WrapperCard>
      <div>
        <div>
          <h3>All Users: </h3>
          <hr />
        </div>
        <DataTable columns={allUsersTableColumns} data={allUsersTableData} />
      </div>
    </WrapperCard>
  );
};
export default AllUsers;
