<?php
class ConexionBD {
    private $host = 'localhost';
    private $usuario = 'root';
    private $clave = '';
    private $base_datos = 'landingBD';
    private $puerto=3306;
    private $conexion;

    public function __construct() {
        $this->conexion = new mysqli($this->host, $this->usuario, $this->clave, $this->base_datos,$this->puerto);

        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
        // testeo de la conexion
        // else{

        //     echo "conexion exitosa";
        // }
    }

    public function getConexion() {
        return $this->conexion;
    }

    public function cerrar() {
        $this->conexion->close();
    }
}
?>