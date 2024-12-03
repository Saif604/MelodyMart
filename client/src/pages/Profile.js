import { useSelector } from "react-redux";

const Profile = () => {
  const { name, email } = useSelector((store) => store.auth.user);

  return (
    <div>
      <div>
        <h4>Profile</h4>
        <hr />
      </div>
      <div>
        
      </div>
    </div>
  );
};
export default Profile;
