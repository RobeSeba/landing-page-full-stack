<?php
$password = "admin123"; // la contraseña que el usuario escribe
$hash = password_hash($password, PASSWORD_DEFAULT);

// Guardas $hash en la base de datos, NO el password real
echo $hash;