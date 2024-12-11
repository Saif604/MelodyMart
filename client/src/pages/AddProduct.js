import { useDispatch, useSelector } from "react-redux";
import { ProductForm,WrapperCard } from "../components";
import { createProduct } from "../features/Products/productsSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.products);
  const handleSubmit = (values, resetForm) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
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
    dispatch(createProduct(formData))
      .then(() => {
        resetForm();
      })
      .catch((error) => console.error(error));
  };
  return (
    <WrapperCard>
      <ProductForm
        handleSubmit={handleSubmit}
        isLoading={status.createProduct.loading}
        title="Add Product"
      />
    </WrapperCard>
  );
};
export default AddProduct;
