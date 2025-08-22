<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Link de bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
  <!-- bootstrap icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
  <title>Curso de Desarrollo</title>
  <!-- mis estilos -->
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <header>
    <!-- menu -->
    <nav class="navbar navbar-dark bg-dark position-sticky">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Aprendiendo <i class="bi bi-code-slash"></i></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Aprendiendo</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contenido</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Formulario</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <!-- fin del menu -->
  </header>
  <main>
    <div class="container-xxl">
      <div class="row p-4">
        <div class="col-6">
          <h4>Aprendiendo a Programar Desde Cero a Experto</h4>
          <h1>Desarollo Web FullStack con Js</h2>
            <div>
              <img src="https://codigo.edu.pe/wp-content/themes/codigo_theme/images/line-svg.svg" alt="">
            </div>
            <p>¡Conviértete en un desarrollador web full stack estés donde estés!</p>
            <p class="motivacion"><strong>Si te encanta aprender y desarrollar, este curso es para ti</strong></p>
            <div class="text-center">
              <img src="https://codigo.edu.pe/wp-content/themes/codigo_theme/images/line-svg.svg" alt="">
            </div>
            <p>Domina el Frontend y Backend desde cero con proyectos reales.</p>
            <p>Construye aplicaciones web modernas combinando diseño, lógica y despliegue. Inicia con el desarrollo Front-End usando HTML5, CSS y JavaScript, y avanza hasta dominar React.js. Luego, adéntrate en el Back-End utilizando Node js como lenguaje principal, junto a frameworks como Express y Next js. Además, trabajarás con bases de datos, autenticación, APIs REST, CI/CD, Docker y despliegue en la nube.</p>
            <p>A lo largo del programa obtendrás certificaciones por cada etapa: Frontend Foundations, Frontend Interactive, React Mastery, Node Foundation, Node Backend Essentials, Node Express Advanced</p>
        </div>
        <!-- formulario -->
        <div class="col-6">
          <form class="formulario" action="php/formulario.php" method="get">
            <div class="mb-3">
              <label for="NombreInput" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="NombreInput" name="NombreInput" placeholder="Ingrese su Nombre">
            </div>
            <div class="mb-3">
              <label for="EmailInput" class="form-label">Correo Electronico</label>
              <input type="email" class="form-control" id="EmailInput" name="EmailInput" placeholder="Ingrese su Correo" required>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Agrega un Comentario</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary registrar">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </main>
  <footer>

  </footer>



  <!-- script de bootstrap -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
    crossorigin="anonymous"></script>
</body>

</html>