const Navbar = () => {
  return (
    <div className="col-lg-10 mx-auto">
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
        <div className="container">
          <a className="navbar-brand" href="!#">
            Inicio
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="!#">
                  Grupos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/createGroup">
                  Crear Grupo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Editar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
