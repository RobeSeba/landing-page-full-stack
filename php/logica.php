<?php
    require_once "conexion.php";

    class Registros{
        private $conexion;

        public function __construct(){
            $bd = new ConexionBD();
            $this->conexion = $bd->getConexion();
        }

        //use curdate para generar la fecha desde mysql
        public function Insertar($nombre,$correo,$telefono,$comentario){
            $stmt = $this->conexion->prepare("INSERT INTO leads (nombre, correo,telefono,comentario,fecha_registro) VALUES (?, ?, ?,?,CURDATE())");
            if (!$stmt) {
                throw new Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
            $stmt->bind_param("ssss", $nombre, $correo,$telefono,$comentario);
            $stmt->execute();
            $stmt->close();
            $this->conexion->close();
            return true;
        }
    }
?>