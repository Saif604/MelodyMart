import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
const ProfileWizard = ({ user,handleEdit}) => {
  const { name, email, role } = user;
  const profile = [
    {
      id: 1,
      label: "Name",
      value: name,
    },
    {
      id: 2,
      label: "Email",
      value: email,
    },
    {
      id: 3,
      label: "Role",
      value: role,
    },
  ];
  return (
    <Wrapper>
      {profile.map(({ id, label, value }) => (
        <div className="profile-row" key={id}>
          <span className="title">{label}</span>
          <span className="text">{value}</span>
        </div>
      ))}
      <div className="btn-container">
        <button className="edit-btn" onClick={()=>handleEdit(false)}>
          <FaEdit />
          User
        </button>
        <button className="edit-btn" onClick={()=>handleEdit(true)}>
          <FaEdit />
          Password
        </button>
      </div>
    </Wrapper>
  );
};
export default ProfileWizard;

const Wrapper = styled.div`
  padding: 1rem;
  .profile-row {
    display: grid;
    grid-template-columns: 1fr 3fr auto;
    align-items: center;
    margin-bottom: 0.5rem;
    .title {
      font-weight: 700;
      text-transform: capitalize;
    }
    .text {
      color: var(--gray-700);
      text-transform: capitalize;
    }
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    margin-top: 1rem;
  }
  .edit-btn {
    border: none;
    padding: 0.25rem 0.5rem;
    background: var(--primary-dark-600);
    color: var(--light);
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.5rem;
    font-weight: 700;
    transition: var(--transition);
    text-transform: capitalize;
    &:hover {
      background: var(--primary-dark-800);
    }
  }
`;
