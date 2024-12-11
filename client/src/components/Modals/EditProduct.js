import Modal from "./modal.styled";
import { closeModal } from "../../features/Modal/modalSlice";
import { useDispatch,useSelector } from "react-redux";
import {ProductForm} from "../index";
const EditProduct = ({title,handleUpdates,isLoading}) => {
    const {show,modalData} = useSelector((store)=>store.modal);
    const dispatch = useDispatch();

    const handleClose = () =>{
        dispatch(closeModal());
    }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* <Modal.Title>{title}</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <ProductForm title={title} initialData={modalData} handleSubmit={(values)=>handleUpdates(modalData._id,values)} isLoading={isLoading}/>
      </Modal.Body>
    </Modal>
  );
}
export default EditProduct