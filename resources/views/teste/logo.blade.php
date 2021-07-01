<?php
//$pagina = env('APP_API_ROUTE')."api/osc/logo/".$id_osc;
$pagina = env('HOST_DOCKER')."api/osc/logo/".$id_osc;
$ch = curl_init();
curl_setopt( $ch, CURLOPT_URL, $pagina );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$data = curl_exec( $ch );
$error = curl_error($ch);
curl_close( $ch );

$data = substr($data, 1);
$data = substr($data, 0, -1);
$data = str_replace("\\", "", $data);
?>
<img src="<?php echo $data; ?>" alt="">
<br>
------------------------------------------------------------------------
<br>
{{$pagina}}
<br>
{{$error}}
<br>
{{$data}}
