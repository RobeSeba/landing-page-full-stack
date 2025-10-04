<?php
    require_once "conexion.php";
    require_once "logica.php";

    $registro = new Registros();
    if(isset($_POST['EmailInput']) && isset($_POST['PasswordInput'])){
        $email=$_POST['EmailInput'];
        $password=$_POST['PasswordInput'];
        
       $respuesta= $registro -> validarUsuario($email,$password);
       if ($respuesta["success"]) {
    // Guardar token en cookie (dura 1 hora)
        setcookie("jwt_token", $respuesta["token"], time() + 3600, "/", "", false, true);
        header("Location: ../pages/dashboard.php");
        exit();
        } else {
            echo $respuesta["message"];
        }
       //echo json_encode($token);
    }
?>