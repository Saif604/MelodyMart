import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../features/Products/productsSlice";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { DataTable, WrapperCard } from "../components";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { closeModal, openModal } from "../features/Modal/modalSlice";
import EditProduct from "../components/Modals/EditProduct";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { status, allProducts, allProductsTableData, allProductsTableColumns } =
    useSelector((store) => store.products);
  const { show } = useSelector((store) => store.modal);
  useEffect(() => {
    dispatch(getAllProducts("?limit=1000"));
  }, [dispatch]);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(getAllProducts("?limit=1000"));
      })
      .catch((error) => console.error(error));
  };
  const handleProductEdit = (productId) => {
    const editProduct = allProducts?.find(({ _id }) => _id === productId);
    dispatch(openModal({ ...editProduct }));
  };
  const handleUpdates = (productId, updatedProduct) => {
    const formData = new FormData();
    Object.entries(updatedProduct).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "images") {
          value.forEach((file, index) => {
            formData.append("images", file);
          });
        } else {
          formData.append(key, JSON.stringify(value));
        }
      } else {
        formData.append(key, value);
      }
    });
    dispatch(updateProduct({ productId, updatedProduct: formData })).then(
      () => {
        dispatch(getAllProducts("?limit=1000"));
        dispatch(closeModal());
      }
    );
  };
  if (status.getAllProducts.loading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (status.getAllProducts.error) {
    return <h3>There is some error...</h3>;
  }
  const tableData = allProductsTableData.map((product) => {
    const newProduct = { ...product };
    if (product.company) {
      newProduct.company = (
        <div className="d-flex align-items-center justify-content-between">
          <span>{product.company}</span>
          <div className="d-flex gap-5">
            <span
              className="icon"
              onClick={() => handleProductEdit(product.productId)}
            >
              <FaEdit />
            </span>
            <span
              className="icon"
              onClick={() => handleProductDelete(product.productId)}
            >
              <ImBin />
            </span>
          </div>
        </div>
      );
    }
    return newProduct;
  });
  return (
    <WrapperCard>
      <div>
        <div>
          <h3>All Products: </h3>
          <hr />
        </div>
        <DataTable columns={allProductsTableColumns} data={tableData} />
        {show && (
          <EditProduct
            title="Edit Product"
            handleUpdates={handleUpdates}
            isLoading={status.updateProduct.loading}
          />
        )}
      </div>
    </WrapperCard>
  );
};
export default AllProducts;
