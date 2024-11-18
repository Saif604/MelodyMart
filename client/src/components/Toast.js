import styled from "styled-components";
import { Toast as BsToast } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { closeShow } from "../features/Toast/toastSlice";
const Toast = () => {
    const dispatch = useDispatch();
    const {background,message,show} = useSelector((state)=>state.toast);

    const handleToastClose = () =>{
        dispatch(closeShow());
    }
  return (
    <Wrapper>
      <BsToast show={show} bg={background} onClose={handleToastClose}>
        <BsToast.Header>
          <strong className="me-auto">Message</strong>
          <small>1s ago</small>
        </BsToast.Header>
        <BsToast.Body className="text-white">{message}</BsToast.Body>
      </BsToast>
    </Wrapper>
  );
}
export default Toast;

const Wrapper = styled.div`
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
`