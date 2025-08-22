<?php
  if (isset($_GET['NombreInput']) && isset($_GET['EmailInput'])) {
    $nombre = $_GET['NombreInput'];
    $email = $_GET['EmailInput'];
    echo "Tu nombre es: " . htmlspecialchars($nombre) . "<br>";
    echo "Tu correo es: " . htmlspecialchars($email);
  } else {
    echo "Faltan datos en el formulario.";
  }
?>
