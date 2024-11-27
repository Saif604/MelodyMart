import { Modal } from "react-bootstrap";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .modal-dialog {
    position: fixed;
    right: 0;
    top:var(--nav-height);
    margin: 0;
    height: 100%;
    min-width: 520px;
    transform: translateX(100%) !important;
    transition: transform 0.3s ease-in-out;
  }

  &.show .modal-dialog {
    transform: translateX(0) !important;
  }

  .modal-content {
    height: 92%;
    border-radius: 0;
    overflow-y: auto;
  }
  @media (max-width: 576px) {
    .modal-dialog {
      min-width: 100%;
    }
  }
`;

export default StyledModal;
