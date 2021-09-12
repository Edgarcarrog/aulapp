
import Main from "./Main";
import { context } from "../context/context";
import { useContext, useEffect} from 'react'

const Profile = (props) => {
  const { authenticateUser } = useContext(context);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      loadUser()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async() => {
    await authenticateUser();
  }
  
  return (
    <div className="App container-fluid">
      <Main props={props} />
    </div>
  );
};

export default Profile;
