<?php
    require __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../php/logica.php';
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
    <?php 
        
        $registro= new Registros();
        $datos=$registro->listar();
        if(!empty($datos)):
    ?>
    <table border="1" cellpadding="8" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Comentario</th>
                <th>Fecha de registro</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($datos as $lead): ?>
            <tr>
                <td><?php echo htmlspecialchars($lead['id']); ?></td>
                <td><?php echo htmlspecialchars($lead['nombre']); ?></td>
                <td><?php echo htmlspecialchars($lead['correo']); ?></td>
                <td><?php echo htmlspecialchars($lead['telefono']); ?></td>
                <td><?php echo htmlspecialchars($lead['comentario']); ?></td>
                <td><?php echo htmlspecialchars($lead['fecha_registro']); ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php else: ?>
        <p>No hay registros para mostrar.</p>
    <?php endif; ?>
</body>
</html>
