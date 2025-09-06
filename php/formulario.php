<?php
// comprobando que los datos lleguen a mi formulario
  if (isset($_GET['NombreInput']) && isset($_GET['EmailInput']) && isset($_GET['ComentarioInput'])) {
    $nombre = $_GET['NombreInput'];
    $email = $_GET['EmailInput'];
    $comentario=$_GET['ComentarioInput'];
    echo "Tu nombre es: " . htmlspecialchars($nombre) . "<br>";
    echo "Tu correo es: " . htmlspecialchars($email) . "<br>";
    echo "tu comentario es ". htmlspecialchars($comentario);
  } else {
    echo "No se completaron los campos en el formulario";
  }
?>
