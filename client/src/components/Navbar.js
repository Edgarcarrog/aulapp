const Navbar = () => {
  return (
    <div className="col-lg-10 mx-auto">
      <nav class="navbar navbar-expand-lg navbar-light bg-light nav">
        <div class="container">
          <a class="navbar-brand" href="!#">
            Inicio
          </a>
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
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="!#">
                  Grupos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/createGroup">
                  Crear Grupo
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="!#">
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
