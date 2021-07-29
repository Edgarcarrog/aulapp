
import Header from "./Header";
import Main from "./Main";

const Profile = (props) => {
  return (
    <div className="App container-fluid">
      <Header />
      <Main props={props} />
    </div>
  );
};

export default Profile;
