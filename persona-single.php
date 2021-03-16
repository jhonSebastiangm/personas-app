<?php

  include('database.php');
  $id = $_POST['id'];
  $query = "SELECT * from tbl_personas WHERE id='$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'DNI' => $row['DNI'],
      'NOMBRE' => $row['NOMBRE'],
      'FECNAC' => $row['FECNAC'],
      'DIR' => $row['DIR'],
      'TFNO' => $row['TFNO'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json[0]);
  echo $jsonstring;
?>
