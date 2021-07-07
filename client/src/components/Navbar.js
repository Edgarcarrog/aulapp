const Navbar = () => {
  return (
    <nav className="navbar navbar-light navbar-expand-md bg-light nav-style mt-3">
      <div className="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#!">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Materias
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Listas
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#!">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
