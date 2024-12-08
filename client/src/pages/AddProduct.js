import { useDispatch, useSelector } from "react-redux";
import { ProductForm } from "../components";
import { createProduct } from "../features/AllProducts/allProductsSlice";

const AddProduct = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((store)=>store.allProducts);
    const handleSubmit = (values) =>{
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
      dispatch(createProduct(formData));
    }
    return <ProductForm handleSubmit={handleSubmit} isLoading={isLoading} title="Add Product"/>
};
export default AddProduct;
