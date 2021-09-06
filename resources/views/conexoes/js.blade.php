<?php $rota = Route::getCurrentRoute()->uri();?>




<script src="js/app.js"></script>
<script src="js/utils.js"></script>
<!--<script src="js/rotas.js"></script>-->

<script>
    getBaseUrl = "{{env('APP_API_ROUTE_OLD')}}";
    getBaseUrl2 = "{{env('APP_API_ROUTE')}}";
</script>
<script>



    function titleize(text, qtd) {
        let qtdString = qtd;
        let qtdTxt = text.length;

        var words = text.toLowerCase().split(" ");

        for (var a = 0; a < words.length; a++) {
            if(words[a] != "de" && words[a] != "da" && words[a] != "do" && words[a] != "dos" && words[a] != "das"){
                var w = words[a];
                words[a] = w[0].toUpperCase() + w.slice(1);
            }
        }
        words = words.join(" ");
        words = words.substr(0, qtdString)
        words = words + (qtdString > qtdTxt ? '' : '...');
        return words;
    }

    function clean(text){
        text = text.toLowerCase();
        text = text.replace(/[áàãâä]/g,'a');
        text = text.replace(/[éèêë]/g,'e');
        text = text.replace(/[íìîï]/g,'i');
        text = text.replace(/[óòõôö]/g,'o');
        text = text.replace(/[úùûü]/g,'u');
        text = text.replace(/[ç]/g,'c');

        text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g,'');
        text = text.replace(/[ ]/g,'-');

        return text;
    }

</script>


<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    <?php if($rota == "area-user" || $rota == "oscs-user" || $rota == "dashboard-user" || $rota == "dados-user"  || $rota == "trocar-senha" || $rota == "selo-user"){ ?>
        pageRoute = false;
    <?php }else{?>
        pageRoute = true;
    <?php }?>
</script>



<script src="js/react/react.development.js" crossorigin></script>
<script src="js/react/react-dom.development.js" crossorigin></script>

<script>
    function get_location() {
        //console.log('get_location');
        if(navigator.geolocation){

            function saveLocation (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                localStorage.setItem('geo', JSON.stringify({lat: lat, lon: lon}));
                //console.log(localStorage.getItem('geo'));
                $.ajax({
                    url: "https://nominatim.openstreetmap.org/reverse?format=json&lat="+lat+"&lon="+lon,
                    success: function(data){
                        console.log(data)
                        if(data.address){
                            localStorage.setItem('city', data.address.city);
                            localStorage.setItem('state', data.address.state);
                            localStorage.setItem('region', data.address.region);
                            localStorage.setItem('country', data.address.country);
                        }
                    },
                    error: function(xhr, status, err){
                        console.error(status, err.toString());
                    }
                });
            }
            // Solicitação de posição instantânea.
            navigator.geolocation.getCurrentPosition (saveLocation);

            //console.log(localStorage.getItem('aaa'));

            return;
        }

        console.log("O NAVEGADOR NÃO É COMPATÍVEL COM GEOLOCALIZAÇÃO");
    }
    get_location();
</script>

<script src="js/components/login/menuUsuario.js"></script>
<script src="js/components/login/menuUsuarioMobile.js"></script>

@if($rota=='detalhar/{id}/{title}' || $rota=='detalhar/{id}')
    <script src="https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-apexcharts@1.3.6/dist/react-apexcharts.iife.min.js"></script>
    <script src="js/components/charts/polarChart.js"></script>
    <script src="js/components/osc/preenchimento.js"></script>
    <script src="js/components/osc/selo.js"></script>
@endif
@if($rota=='/')
    <script>
        app_url = "{{env('APP_URL')}}";
    </script>
<script src="js/home.js" ></script>
<script src="js/conf-owl-carousel.js"></script>
{{--<script src="js/chart.js"></script>
<script src="js/charts/mixed.js"></script>--}}

<script src="https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="https://cdn.jsdelivr.net/npm/react-apexcharts@1.3.6/dist/react-apexcharts.iife.min.js"></script>

<script src="js/components/charts/mixedChart.js"></script>
<script src="js/components/charts/pieChart.js"></script>
<script src="js/components/charts/charts.js"></script>
<script src="js/components/charts/page/home.js"></script>

<script src="js/components/home/next/api.js"></script>
<script src="js/components/home/recentes/api.js"></script>
<script src="js/components/forms/search.js"></script>


@endif

@if($rota=='indicadores')
    <script src="https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-apexcharts@1.3.6/dist/react-apexcharts.iife.min.js"></script>

<script src="js/components/charts/mixedChart.js"></script>
<script src="js/components/charts/pieChart.js"></script>
<script src="js/components/charts/charts.js"></script>
<script src="js/components/charts/page/indicator.js"></script>
@endif
@if($rota=='pagina/depen')
    <script src="js/components/pages/depen.js"></script>
@endif


@if($rota=='localidade/{id}')
    <script src="js/lib/apexcharts/prop-types.min.js"></script>
    <script src="js/lib/apexcharts/apexcharts.js"></script>
    <script src="js/lib/apexcharts/react-apexcharts.iife.min.js"></script>

<script src="js/components/charts/mixedChart.js"></script>
<script src="js/components/charts/columnChart.js"></script>
<script src="js/components/charts/pieChart.js"></script>
    <!--
    <script src="js/components/charts/textCharts.js"></script>
    <script src="js/components/charts/page/textChart.js"></script>-->
<script src="js/components/localidade/perfil.js"></script>
@endif


@if($rota=='mapa' || $rota=='mapa/{origem}' || $rota=='mapa-busca-avancada')
    <script src="js/components/forms/search.js"></script>
    <script src="js/leaflet.js"></script>
    <script src="js/components/maps/visualizarFiltros.js"></script>
    <script src="js/components/maps/oscMap.js"></script>
    <script src="js/components/maps/page/page.js"></script>
@endif


<script>
    // Basic usage of $.animateScroll.
    //$('#iniciodorodape a', '#acessibilidade a').animateScroll();

    // $.animateScroll with options.
    /*$('.link-to-menu').animateScroll({
        speed: 800,
        offset: 30
    });*/
</script>
<script>
    $(document).ready(function(){
        var fonte = 15;

        if(fonte==15){
            $('#contrast').css({'font-size' : localStorage.getItem('fonte')+'px'});
        }
        $('#aumenta_fonte').click(function(){
            if (fonte<22){
                fonte = fonte+2;
                localStorage.setItem('fonte', fonte);
                $('#contrast').css({'font-size' : fonte+'px'});
            }
        });
        $('#reset_fonte').click(function(){
            fonte = 15;
            localStorage.setItem('fonte', fonte);
            $('#contrast').css({'font-size': '16px'});
        });
        $('#reduz_fonte').click(function(){
            if (fonte>10){
                fonte = fonte-2;
                localStorage.setItem('fonte', fonte);
                $('#contrast').css({'font-size' : fonte+'px'});
            }
        });
    });
</script>
<script>
    //Barra scroll
    $(window).on('scroll', function(){
        var s = $(window).scrollTop(),
            d = $(document).height(),
            c = $(window).height();

        var scrollPercent = (s / (d - c)) * 100;
        scrollPercent = Math.round(scrollPercent);
        document.getElementById('progress').style.width = scrollPercent+'%';

        //console.clear();
        //console.log(scrollPercent);
    })
</script>
<script>$('.block').smoove({offset:'40%'});</script>
<script>
    $(document).ready(function() {
        $('.menu-cel-hide').hide();
        $('.menu-cel-login-hide').hide();

        $('.btn-cel').click(function() {
            $('.menu-cel-hide').animate({width:'toggle'},350);
            $('.menu-cel-icon').toggle('slow, 1000');
        });
        $('#btn-cel-login').click(function() {
            $('.menu-cel-login-hide').animate({height:'toggle'},350);
        });
    });
</script>
<script>
    $(document).ready(function() {
        $('.fa-chevron-right').hide();

        $('.btn-right').click(function() {
            $('.box-floating').hide();
        });

        $('.btn-menu-txt').click(function() {
            $('.menu-icons-txt').hide();
            $('.fa-chevron-right').hide();
            $('.fa-chevron-left').show();
            $('.box-floating').css('width', '45px');
            $('.menu-icons li').css('border', '0');
            $('.menu-icons li').css('padding-bottom', 0);
            $('.menu-icons li').css('margin-bottom', 0);
        });

        $('.btn-menu-txt-show').click(function() {
            $('.menu-icons-txt').show();
            $('.fa-chevron-right').show();
            $('.fa-chevron-left').hide();
            $('.box-floating').css('width', '250px');
            $('.menu-icons li').css('border-bottom', 'solid 1px #CCCCCC');
            $('.menu-icons li').css('padding-bottom', '3px');
            $('.menu-icons li').css('margin-bottom', '2px');

        });

    });
</script>

<!--///////////////////////////////REACT////////////////////////////-->
@if($rota=="contato")
    <script src="js/components/forms/contact.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/leaflet.js"></script>
    <script src="js/components/maps/address.js"></script>
@endif
@if($rota=="filtro")
    <script>
        csrf_token = '<?php echo csrf_token(); ?>';
    </script>
    <script src="js/components/forms/range.js"></script>
    <script src="js/components/forms/filter.js"></script>
    <script src="js/components/forms/page/api.js"></script>
    <script src="js/utils.js"></script>
@endif

@if($rota=="artigo/{id}/{titulo}")
    <script src="js/components/forms/comment.js"></script>
    <script src="js/utils.js"></script>
@endif

{{--@if($rota=="artigos" || $rota=="artigos/{id_segment}" || $rota=="artigos/{titulo}" || $rota=="artigos/{parameters}")--}}
@if($rota=="posts/{midia_id}/{midia}")
    <script src="js/components/posts/search.js"></script>
    <script src="js/components/posts/filterCategories.js"></script>
    <script src="js/components/posts/filterMembers.js"></script>
    <script src="js/components/posts/filterArchives.js"></script>
    <script src="js/components/posts/filters.js"></script>
    <script src="js/components/posts/list.js"></script>
    <script src="js/utils.js"></script>
@endif

{{--Área Restrita--}}
@if($rota=="login/{carrinho}" || $rota=="login")
    <script src="js/components/login/preRegister.js"></script>
    <script src="js/components/login/forgetPassword.js"></script>
    <script src="js/components/login/login.js"></script>
@endif
{{--@if($rota=="reset-password/{token}/{email}")--}}
@if($rota=="redefinir-senha/{id_usuario}/{hash}")
    <script src="js/components/login/resetPassword.js"></script>
@endif
@if($rota=="osc-user/{id}")
    <script>
        localStorage.setItem('@App:id_osc', {{$id}});
        id = localStorage.getItem('@App:id_osc');
    </script>
    <script src="js/components/user-area/osc.js"></script>
@endif
@if(
    $rota=="area-user" ||
    $rota=="dashboard-user" ||
    $rota=="dados-arquivos" ||
    $rota=="oscs-user" ||
    $rota=="osc-user/{id}" ||
    $rota=="objetivos-user" ||
    $rota=="dados-arquivo/{id}" ||
    $rota=="dados-user" ||
    $rota=="trocar-senha" ||
    $rota=="videos-privados" ||
    $rota=="areas-atuacao-user" ||
    $rota=="descricao-user" ||
    $rota=="certificates-user" ||
    $rota=="projetos-user" ||
    $rota=="governancas-user" ||
    $rota=="participacoes-user" ||
    $rota=="recursos-user" ||
    $rota=="selo-user"
    )
    <script>
        id = localStorage.getItem('@App:id_osc');
    </script>
    <script src="js/components/user-area/headerUser.js"></script>
    <script src="js/components/user-area/menu.js"></script>
@endif
@if($rota=="certificates-user")
    <script src="js/components/user-area/formCertificate.js"></script>
    <script src="js/components/user-area/formEditCertificate.js"></script>
    <script src="js/components/user-area/certificates.js"></script>
@endif
@if($rota=="projetos-user")
    <script src="js/components/user-area/formProjeto.js"></script>
    <script src="js/components/user-area/formEditProjeto.js"></script>
    <script src="js/components/user-area/formOscParceira.js"></script>
    <script src="js/components/user-area/formProjetoFinanciador.js"></script>
    <script src="js/components/user-area/formProjetoLocalizacao.js"></script>
    <script src="js/components/user-area/formProjetoPublico.js"></script>
    <script src="js/components/user-area/projetos.js"></script>
@endif
@if($rota=="governancas-user")
    <script src="js/components/user-area/formGovernanca.js"></script>
    <script src="js/components/user-area/formConselho.js"></script>
    <script src="js/components/user-area/formEditGovernanca.js"></script>
    <script src="js/components/user-area/formEditConselho.js"></script>
    <script src="js/components/user-area/governancas.js"></script>
@endif
@if($rota=="participacoes-user")
    <script src="js/components/user-area/formParticipacaoConselho.js"></script>
    <script src="js/components/user-area/formParticipacaoConferencia.js"></script>
    <script src="js/components/user-area/formParticipacaoOutro.js"></script>
    <script src="js/components/user-area/formEditParticipacaoOutro.js"></script>
    <script src="js/components/user-area/formEditParticipacaoConferencia.js"></script>
    <script src="js/components/user-area/formEditParticipacaoConselho.js"></script>
    <script src="js/components/user-area/participacoes.js"></script>
@endif
{{--@if($rota=="recursos-user")
    <script src="js/components/user-area/formRecurso.js"></script>
    <script src="js/components/user-area/recursos.js"></script>
@endif--}}
@if($rota=="recursos-user")
    <script src="js/components/osc/tour.js"></script>
    <script src="js/components/forms/recurso.js"></script>
    <script src="js/components/user-area/recursos.js"></script>
@endif
@if($rota=="areas-atuacao-user")
    <script src="js/components/user-area/formAtuacao.js"></script>
    <script src="js/components/user-area/atuacoes.js"></script>
@endif

@if($rota=="area-user" || $rota=="dashboard-user" )
    <script src="js/components/user-area/dashboard.js"></script>
@endif
@if($rota=="dados-user")
    <script src="js/components/user-area/data.js"></script>
@endif
@if($rota=="trocar-senha")
    <script src="js/components/user-area/trocar-senha.js"></script>
@endif
@if($rota=="descricao-user")
    <script src="js/components/user-area/descricao.js"></script>
@endif

@if($rota=="selo-user")
    <script src="js/components/user-area/seal.js"></script>
@endif
@if($rota=="selo-osc-user/{id_osc}")
    <script>
        id_osc = {{$id_osc}};
        app_url = "{{env('APP_URL')}}";
    </script>
    <script src="js/components/user-area/seal.js"></script>
@endif
@if($rota=="dados-arquivos")
    <script src="js/components/user-area/documents.js"></script>
@endif
@if($rota=="dados-arquivo/{id}")
    <script>
        id = {{$id}};
    </script>
    <script src="js/components/user-area/document.js"></script>
@endif
@if($rota=="oscs-user")
    <script src="js/components/user-area/oscs.js"></script>
@endif
@if($rota=="objetivos-user")
    <script src="js/components/osc/tour.js"></script>
    <script src="js/components/user-area/objetivos.js"></script>
@endif
@if($rota=="register")
    <script src="js/components/join/register.js"></script>
@endif

@if(
    $rota=="area-user" || $rota=="dashboard-user" || $rota=="dados-user"  || $rota=="trocar-senha" || $rota=="oscs-user" || $rota=="osc-user/{id}" ||
    $rota=="objetivos-user" || $rota=="selo-user" || $rota=="certificates-user" || $rota=="projetos-user" ||
    $rota=="governancas-user" || $rota=="areas-atuacao-user" || $rota=="descricao-user" || $rota=="participacoes-user" ||
    $rota=="recursos-user" || $rota=="logout-user" || $rota=="dados-arquivos" || $rota=="dados-arquivo/{id}" || $rota=="videos-privados"
    //$rota=="update-data" || $rota=="update-descricao" || $rota=="get-data" ||
    //$rota=="get-osc" ||  $rota=="list-users-oscs" ||  $rota=="save-logo-osc" || $rota=="get-logo-osc" || $rota=="update-osc" ||
    //$rota=="list-users-certificates" || $rota=="remove-user-certificate/{id}" || $rota=="edit-user-certificate/{id}" ||
    //$rota=="list-users-governancas" ||  $rota=="remove-user-governanca/{id}" || $rota=="edit-user-governanca/{id}" ||
    //$rota=="list-users-conselhos" || $rota=="list-users-documents" || $rota=="detalhar-users-document/{id}" ||
    //$rota=="list-private-videos" ||  $rota=="private-video/{id}" ||  $rota=="get-descricao"
    )
    <script>
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'check-token',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            cache: false,
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
                location.href = 'login';
            }.bind(this)
        });
    </script>
@endif

<script>
    $('#ativarBox').click(function(){
        $('.box-busca').toggle();
    });
    $('.box-busca').mouseleave(function(){
        $('.box-busca').toggle();
    });
</script>
