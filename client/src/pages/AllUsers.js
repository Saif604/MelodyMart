import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import { useEffect } from "react";
import { getAllUsers } from "../features/AllUsers/allUsersSlice";
import { DataTable } from "../components";

const AllUsers = () => {
  const dispatch = useDispatch();
  const {isLoading,isError,allUsers,tableColumns} = useSelector((store)=>store.allUsers);

  useEffect(()=>{
    dispatch(getAllUsers());
  },[dispatch])

  if(isLoading){
   return (<div className="page flx-cntr">
      <Spinner animation="grow" className="loadder"/>
    </div>) 
  }
  if(isError){
    return (<h3>There is some error....</h3>)
  }
  return (
    <div>
      <div>
        <h3>All Users: </h3>
        <hr />
      </div>
      <DataTable columns={tableColumns} data={allUsers}/>
    </div>
  )
}
export default AllUsers