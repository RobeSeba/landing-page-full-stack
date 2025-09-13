<?php
    require_once "conexion.php";

    class Registros{
        private $conexion;

        public function __construct(){
            $bd = new ConexionBD();
            $this->conexion = $bd->getConexion();
        }


        public function Insertar($nombre,$correo,$comentario){
            $stmt = $this->conexion->prepare("INSERT INTO registros (nombre, correo, comentario) VALUES (?, ?, ?)");
            if (!$stmt) {
                throw new Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
            $stmt->bind_param("sss", $nombre, $correo, $comentario);
            $stmt->execute();
            $stmt->close();
            $this->conexion->close();
            return true;
        }
    }
?>