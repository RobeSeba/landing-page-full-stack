<?php
    require_once "conexion.php";

    if(isset($_POST['EmailInput']) && isset($_POST['PasswordInput'])){
        $email=$_POST['EmailInput'];
        $password=$_POST['PasswordInput'];
        echo" tu email es ". htmlspecialchars($email) . "<br>";
        echo" tu contraseña es ". htmlspecialchars($password)."<br>";

    }
?>