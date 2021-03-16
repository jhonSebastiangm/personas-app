<?php

  include('database.php');

if(isset($_POST['id'])) {
  $DNI = $_POST['DNI'];
  $NOMBRE = $_POST['NOMBRE'];
  $FECNAC = $_POST['FECNAC'];
  $DIR = $_POST['DIR'];
  $TFNO = $_POST['Telefono']; 
  $id = $_POST['id'];
  $query = "UPDATE tbl_personas SET DNI = '$DNI', NOMBRE = '$NOMBRE', FECNAC = '$FECNAC', DIR = '$DIR', TFNO = '$TFNO' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "Persona editada correctamente";  

}

?>
