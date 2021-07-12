<?php
if ( ! function_exists('dataEn2Br') ){
    function dataEn2Br($valor, $tipo){

        $meses_extenso = [
            "January" => "Janeiro", "February" => "Fevereiro", "March" => "Março", "April" => "Abril",
            "May" => "Maio", "June" => "Junho", "July" => "Julho", "August" => "Agosto", "September" => "Setembro",
            "October" => "Outubro", "November" => "Novembro", "December" => "Dezembro",
        ];

        $meses_abreviados = [
            "Jan" => "Jan", "Feb" => "Fev", "Mar" => "Mar", "Apr" => "Abr",
            "May" => "Mai", "Jun" => "Jun", "Jul" => "Jul", "Aug" => "Ago", "Sep" => "Set",
            "Oct" => "Out", "Nov" => "Nov", "Dec" => "Dez",
        ];

        if($tipo=='mes_extenso'){
            return $meses_extenso[$valor];
        }

        if($tipo=='mes_abreviado'){
            return $meses_abreviados[$valor];
        }


        return false;
    }
}

if ( ! function_exists('nomeMes') ){
    function nomeMes($valor, $tipo){


        $meses_extenso = [
            1 => "Janeiro", 2 => "Fevereiro", 3 => "Março", 4 => "Abril",
            5 => "Maio", 6 => "Junho", 7 => "Julho", 8 => "Agosto",
            9 => "Setembro", 10 => "Outubro", 11 => "Novembro", 12 => "Dezembro",
        ];

        $meses_abreviados = [
            "01" => "Jan", "02" => "Fev", "03" => "Mar", "04" => "Abr",
            "05" => "Mai", "06" => "Jun", "07" => "Jul", "08" => "Ago",
            "09" => "Set", "10" => "Out", "11" => "Nov", "12" => "Dez",
        ];

        //gatilho para não dar erro nos três primeiros meses do ano. Acertar depois o algoritmo para o ano.
        if($valor<1){
            $valor=1;
        }

        if($tipo=='mes_extenso'){
            return $meses_extenso[$valor];
        }

        if($tipo=='mes_abreviado'){
            return $meses_abreviados[$valor];
        }


        return false;
    }
}

if ( ! function_exists('clean') ) {
    function clean($string, $permitir = null) {

        $string = str_replace(' ', '-', $string); // troca espaços por hífens.

        $string = strtolower($string);



        $string = preg_replace("/[áàâãä]/u", "a", $string);// a flag "u" serve para resolver problemas de enconding
        $string = preg_replace("/[éèê]/u", "e", $string);
        $string = preg_replace("/[íì]/u", "i", $string);
        $string = preg_replace("/[óòôõö]/u", "o", $string);
        $string = preg_replace("/[úùü]/u", "u", $string);
        $string = preg_replace("/[ç]/u", "c", $string);

        $string = preg_replace("/[^A-Za-z0-9\-.$permitir]/", '', $string); // remove caracteres especiais.

        //$string = preg_replace('/', '-', $string);
        $string = preg_replace('/-+/', '-', $string); // trocas multiplos hífens por apenas um.

        return $string;
    }
}

if ( ! function_exists('clean_keywords') ) {
    function clean_keywords($string) {

        $string = preg_replace( "/\r|\n/", " ", $string );
        $string = str_replace('</p>', "", $string);
        $string = str_replace('</h3>', "", $string);
        $string = str_replace('</li>', "", $string);

        $string = str_replace(' - ', " ", $string);
        $string = str_replace(',', " ", $string);

        $string = html_entity_decode($string);
        //$string = html_entity_decode($string, ENT_QUOTES, "UTF-8");
        $string = strip_tags($string);
        $string = str_replace('/', " ", $string);
        $string = strtolower($string);

        $string = preg_replace("/[áàâãä]/u", "a", $string);
        $string = preg_replace("/[éèê]/u", "e", $string);
        $string = preg_replace("/[íì]/u", "i", $string);
        $string = preg_replace("/[óòôõö]/u", "o", $string);
        $string = preg_replace("/[úùü]/u", "u", $string);
        $string = preg_replace("/[ç]/u", "c", $string);

        $string = preg_replace('/[^A-Za-z\- ]/', '', $string); // remove caracteres especiais.

        //Log::info('::::'.$string);
        return preg_replace('/-+/', '-', $string); // trocas multiplos hífens por apenas um.
    }
}

if ( ! function_exists('keywords') ) {
    function keywords($string, $jump) {
        $excluidos = excluidos();

        $string = clean_keywords($string);
        $array_string = explode(" ", $string);
        $validas = array_diff($array_string, $excluidos);

        $validas = array_values($validas);

        $array_keywords = Array();

        $cont = 0;
        $max_cont = 30;
        $lenght = count($validas);
        $keywords = Array();
        for($i=0;$i<$lenght;$i++){
            $i += rand(0, $jump);
            //Log::info($i.'::::'.count($validas));
            if($i>=$lenght){
                break;
            }
            $keywords[$cont] = $validas[$i];
            $cont++;
            if($cont==$max_cont){
                break;
            }
        }
        //remove elementos vazios
        foreach($keywords as $index => $key){
            if($key==""){
                unset($keywords[$index]);
            }
        }
        $keywords = implode(", ", $keywords);

        //Log::info('::::'.$keywords);

        return $keywords;
    }
}

if ( ! function_exists('clean_keywords_landingPage') ) {
    function clean_keywords_landingPage($string) {

        $string = preg_replace("/[áàâãä]/u", "a", $string);
        $string = preg_replace("/[éèê]/u", "e", $string);
        $string = preg_replace("/[íì]/u", "i", $string);
        $string = preg_replace("/[óòôõö]/u", "o", $string);
        $string = preg_replace("/[úùü]/u", "u", $string);
        $string = preg_replace("/[ç]/u", "c", $string);

        $string = preg_replace('/[^A-Za-z\- ]/', '', $string); // remove caracteres especiais.

        //Log::info('::::'.$string);
        return preg_replace('/-+/', '-', $string); // trocas multiplos hífens por apenas um.
    }
}

if ( ! function_exists('keywordsLandingPage') ) {
    function keywordsLandingPage($string) {

        $string = clean_keywords_landingPage($string);

        $keywords = str_replace(' -', ',', $string);

        $keywords = strtolower($keywords);

        return $keywords;
    }
}

if ( ! function_exists('description') ) {
    function description($string) {

        $string = preg_replace( "/\r|\n/", " ", $string );
        $string = str_replace(chr(13), " ", $string);
        $string = strip_tags($string);
        $string = limitText($string, 160);


        return $string;
    }
}

if ( ! function_exists('excluidos') ) {
    function excluidos() {

        $excluidos = [

            'a', 'as', 'ao', 'aos', 'ante', 'apos', 'ante', 'ate', 'algum', 'alguma', 'alguns', 'algumas',
            'com', 'conforme', 'contra', 'consoante',
            'da', 'de', 'do', 'das', 'dos', 'das', 'dum', 'duma', 'duns', 'dumas', 'desde', 'durante',
            'e', 'em', 'eu', 'ele', 'ela', 'eles', 'elas', 'entre', 'excepto', 'esta', 'este',
            'fim',
            'ir',
            'meio', 'mim', 'meus', 'mediante ',
            'no', 'na', 'nos', 'nas','num', 'numa', 'nuns', 'numas', 'nenhum', 'nenhuma', 'nao', 'nosso', 'nossa', 'nossos', 'nossas', 'nisto', 'naquilo', 'naquele', 'naquela', 'naqueles', 'naquelas', 'nesse', 'nessa', 'nesses', 'nesses',
            'o', 'os', 'outro', 'outra', 'outros', 'outras',
            'que', 'quem', 'qual', 'quais', 'quando', 'quanto',
            'pelo', 'pela', 'pelos', 'pelas', 'para', 'pras', 'pros', 'perante', 'por',
            'se', 'seu', 'seus', 'suas', 'sua', 'salvo', 'sem', 'segundo', 'sob', 'sobre', 'sim',
            'teu', 'tu', 'todos', 'todas', 'tras', 'talvez',
            'um', 'uma', 'uns', 'umas',
            'vos', 'vir', 'vem', 'vosso', 'vi'
        ];

        return $excluidos;
    }
}

if ( ! function_exists('limitText') ) {
    function limitText($string, $qty) {

        $string=substr($string,'0',$qty);
        $last=strrpos($string," ");
        $string=substr($string,0,$last);

        return $string;
    }
}

if ( ! function_exists('to') ) {
    function to($string) {
        $string = strtolower($string);

        $string = preg_replace("/[áàâãä]/", "a", $string);
        $string = preg_replace("/[éèê]/", "e", $string);
        $string = preg_replace("/[íì]/", "i", $string);
        $string = preg_replace("/[óòôõö]/", "o", $string);
        $string = preg_replace("/[úùü]/", "u", $string);
        $string = preg_replace("/[ç]/", "c", $string);

        return $string;
    }
}

if ( ! function_exists('onlyNumbers') ) {
    function onlyNumbers($string) {
        $string = preg_replace("/[^0-9]/", "", $string);

        return $string;
    }
}


if ( ! function_exists('formatBr') ) {
    function formatBr($string, $type = null, $hour = null)
    {

        $dateOriginal = $string;

        $monthEnExt = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        $monthBrExt = array("de janeiro de", "de fevereiro de", "de março de", "de abril de", "de maio de", "de junho de", "de julho de", "de agosto de", "de setembro de", "de outubro de", "de novembro de", "de dezembro de");

        $monthEnAbb = array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez");
        $monthBrAbb = array("de jan de", "de fev de", "de mar de", "de abr de", "de mai de", "de jun de", "de jul de", "de ago de", "de set de", "de out de", "de nov de", "de dez de");

        if ($hour == 'hs') {
            $hour = " - H:i:s";
        }
        if ($type == 'num'){
            $string = date_create($string);
            $string = date_format($string, 'd/m/Y'.$hour);
        }else if($type == 'ext'){
            $string = date_create($string);
            $string = date_format($string, 'd F Y'.$hour);
            $string = str_replace($monthEnExt, $monthBrExt, $string);
        }else if($type == 'abb'){
            $string = date_create($string);
            $string = date_format($string, 'd M Y'.$hour);
            $string = str_replace($monthEnAbb, $monthBrAbb, $string);
        }else if($type == 'run'){
            $time = strtotime(date('Y-m-d H:i:s')) - strtotime($dateOriginal);
            $seconds = $time;
            $minutes = round($time / 60);
            $hours = round($time / 3600);
            $days = round($time / 86400);
            $weeks = round($time / 604800);
            $months = round($time / 2419200);
            $years = round($time / 29030400);
            if ($seconds <= 60) return"1 min atrás";
            else if ($minutes <= 60) return $minutes==1 ?'1 min atrás':$minutes.' min atrás';
            else if ($hours <= 24) return $hours==1 ?'1 hora atrás':$hours.' horas atrás';
            else if ($days <= 7) return $days==1 ?'1 dia atrás':$days.' dias atrás';
            else if ($weeks <= 4) return $weeks==1 ?'1 semana atrás':$weeks.' semanas atrás';
            else if ($months <= 12) return $months == 1 ?'1 mês atrás':$months.' meses atrás';
            else return $years == 1 ? 'um ano atrás':$years.' anos atrás';
        }else if($type == 'y'){
            $string = date_create($string);
            $string = date_format($string, 'Y'.$hour);
        }

        return $string;
    }
}


if ( ! function_exists('captz') ) {
    function captz($string) {

        //$string = strtoupper($string);
        $string = strtolower($string);
        $string = ucwords($string);

        $string = str_replace("Da", "da", $string);
        $string = str_replace("De", "de", $string);
        $string = str_replace("Do", "do", $string);

        return $string;
    }
}

if ( ! function_exists('curlSelo') ) {
    function curlSelo($string, $id) {

        $url = env('APP_API_ROUTE')."osc/".$string."/".$id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);
        $data = json_decode($data, true);

        return $data;
    }
}

if ( ! function_exists('curl') ) {
    function curl($string, $id) {

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/".$string."/".$id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);
        $data = json_decode($data);

        return $data;
    }
}

if ( ! function_exists('curlList') ) {
    function curlList($string, $id) {

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/".$string."/".$id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $string = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);
        $data = json_decode($string);

        if(!is_array($data)){
            $data = [];
        }

        return $data;
    }
}

if ( ! function_exists('curlListODS') ) {
    function curlListODS($string, $id) {

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/".$string."/".$id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $string = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        $data = json_decode($string);


        if(!is_array($data)){
            $data = [];
        }

        return $data;
    }
}

if ( ! function_exists('curlListParametros') ) {
    function curlListParametros($string, $id, $paremetros) {

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/".$string."/".$id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $string = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        $data = json_decode($string, true);
        $data = $data[$paremetros];
        if(!is_array($data)){
            $data = [];
        }
        return $data;
    }
}

if ( ! function_exists('curlListAno') ) {
    function curlListAno($string, $id, $ano) {

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/".$string."/".$ano."/".$id;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $string = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);



        $data = json_decode($string, true);

        if(!empty($data[$ano])){
            $data = $data[$ano];
            if(!is_array($data)){
                $data = [];
            }
        }

        \Illuminate\Support\Facades\Log::info($data);

        return $data;
    }
}

if ( ! function_exists('my_array_unique') ) {
    function my_array_unique($array, $keep_key_assoc = false) {

        $duplicate_keys = array();
        $tmp = array();

        foreach ($array as $key => $val){
            if (is_object($val))
                $val = (array)$val;

            if (!in_array($val, $tmp))
                $tmp[] = $val;
            else
                $duplicate_keys[] = $key;
        }

        foreach ($duplicate_keys as $key)
            unset($array[$key]);


        return $keep_key_assoc ? $array : array_values($array);
    }
}
