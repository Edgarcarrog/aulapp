import Navbar from "./Navbar";
import Title from "./Title";

const Header = () => {
  return (
    <header className="fondo">
      <div className="back_header container-fluid sticky-top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Navbar />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-center text-dark-gray margin-auto">
              <Title />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
