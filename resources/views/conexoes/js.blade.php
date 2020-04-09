<?php $rota = Route::getCurrentRoute()->uri();?>

<script src="js/app.js"></script>

<script src="/js/react/react.development.js" crossorigin></script>
<script src="/js/react/react-dom.development.js" crossorigin></script>

@if($rota=='/')
<script src="js/home.js"></script>
<script src="js/conf-owl-carousel.js"></script>
<script src="js/chart.js"></script>
<script src="js/charts/mixed.js"></script>


@endif
@if($rota=='mapa' || $rota=='contato')
<script src="js/map.js"></script>
<script>
    var cities = L.layerGroup();
    //var cities = L.MarkerClusterGroup();

    L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
        L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
        L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
        L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);


    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
        streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

    var map = L.map('map', {
        center: [39.73, -104.99],
        zoom: 10,
        layers: [grayscale, cities]
    });

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streetsgit
    };

    var overlays = {
        "Cities": cities
    };

    L.control.layers(baseLayers, overlays).addTo(map);
</script>
@endif
<script>
    // Basic usage of $.animateScroll.
    $('#iniciodorodape a', '#acessibilidade a').animateScroll();

    // $.animateScroll with options.
    $('.link-to-menu').animateScroll({
        speed: 800,
        offset: 30
    });
</script>
<script>
    $(document).ready(function(){
        var fonte = 16;

        if(fonte==16){
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
            fonte = 16;
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


<!--///////////////////////////////REACT////////////////////////////-->

@if($rota=="contato")
    <script src="/js/components/forms/contact.js"></script>
    <script src="/js/utils.js"></script>
@endif

@if($rota=="artigos" || $rota=="artigos/{id_segment}" || $rota=="artigos/{titulo}" || $rota=="artigos/{parameters}")
    <script src="/js/components/posts/filterOffers.js"></script>
    <script src="/js/components/posts/filterCategories.js"></script>
    <script src="/js/components/posts/filterMembers.js"></script>
    <script src="/js/components/posts/filterDistricts.js"></script>
    <script src="/js/components/posts/filters.js"></script>
    <script src="/js/components/posts/list.js"></script>
    <script src="/js/utils.js"></script>
@endif
