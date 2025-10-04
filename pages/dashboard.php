<?php
    require __DIR__ . '/../vendor/autoload.php';
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    // Clave secreta usada en login
    $key = "@1254sd";

    // Verificar si hay token en la cookie
    if (!isset($_COOKIE["jwt_token"])) {
        header("Location: ../pages/login.html");
        exit();
    }

    $token = $_COOKIE["jwt_token"];

    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
    } catch (Exception $e) {
        // Token inválido o expirado
        header("Location: ../pages/login.html");
        exit();
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Bienvenido al Dashboard</h1>

</body>
</html>
