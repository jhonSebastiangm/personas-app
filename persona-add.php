<?php

  include('database.php');

if(isset($_POST['DNI'])) {
  $DNI = $_POST['DNI'];
  $NOMBRE = $_POST['NOMBRE'];
  $FECNAC = $_POST['FECNAC'];
  $DIR = $_POST['DIR'];
  $TFNO = $_POST['Telefono'];
  $query = "INSERT INTO tbl_personas(DNI, NOMBRE, FECNAC, DIR, TFNO) VALUES ('$DNI', '$NOMBRE','$FECNAC','$DIR','$TFNO')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "Persona Agregada Correctamente";  

}

?>
