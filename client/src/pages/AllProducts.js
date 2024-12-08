import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/AllProducts/allProductsSlice";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { DataTable } from "../components";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, allProducts, tableColumns } = useSelector(
    (store) => store.allProducts
  );
  useEffect(() => {
    dispatch(getAllProducts("?limit=1000"));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (isError) {
    return <h3>There is some error...</h3>;
  }

  return (
    <div>
      <div>
        <h3>All Products: </h3>
        <hr />
      </div>
      <DataTable columns={tableColumns} data={allProducts} />
    </div>
  );
};
export default AllProducts;
