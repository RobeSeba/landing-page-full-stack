<?php
    require_once "conexion.php";
    require __DIR__ . '/../vendor/autoload.php';



    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

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
        
        public function validarUsuario($email,$password){
            $stmt = $this->conexion->prepare("SELECT id_user, email, pass FROM users WHERE email = ?");
            if(!$stmt){
                throw new Exception("Error al preparar la consulta: " . $this->conexion->error);
            }

            $stmt->bind_param("s", $email);
            $stmt->execute();
            $resultado = $stmt->get_result();

            if($resultado->num_rows === 0){
                // Usuario no encontrado
                return ["success" => false, "message" => "Usuario no encontrado"];
            }
            $usuario = $resultado->fetch_assoc();

            // Validar password
            if(!password_verify($password, $usuario["pass"])){
                return ["success" => false, "message" => "Contraseña incorrecta"];
            }

            // Generar JWT
            $key = "@1254sd"; // 👈 cámbiala por una clave privada
            $now=strtotime("now");
            $payload = [
                "iss" => "http://tusitio.com",  // emisor
                "aud" => "http://tusitio.com",  // audiencia
                "iat" => time(),                // fecha de emisión
                "exp" => $now + 3600,      // expira en 1 hora
                "data" => [
                    "id" => $usuario["id_user"],
                    "email" => $usuario["email"]
                ]
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');

            $stmt->close();
            $this->conexion->close();

            return ["success" => true, "token" => $jwt];
                    
          }

        public function Listar(){
            $stmt = $this->conexion->prepare("SELECT id, nombre, correo, telefono, comentario, fecha_registro FROM leads");
            if(!$stmt){
                throw new Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
            $stmt->execute();
            $resultado = $stmt->get_result();
            $leads = [];
            while($row = $resultado->fetch_assoc()){
                $leads[] = $row;
            }
            $stmt->close();
            $this->conexion->close();
            return $leads;
    }
}
?>