import Navbar from "./Navbar";
import { context } from "../context/context";
import { Fragment, useContext } from "react";
//import Title from "./Title";

const Header = () => {
  const { isLoggedIn } = useContext(context);
  return (
    <Fragment>
      <header className="fondo row">
        {isLoggedIn ? (
          <Navbar />
        ) : (
          <h2 className="text-light">Aulapp. Tu ayudante escolar.</h2>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
