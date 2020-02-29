<?php $rota = Route::getCurrentRoute()->uri();?>

<script src="js/app.js"></script>
@if($rota=='/')
<script src="js/home.js"></script>
<script src="js/conf-owl-carousel.js"></script>
<script src="js/chart.js"></script>
<script src="js/charts/mixed.js"></script>

{{--<script src="/js/react/react.development.js" crossorigin></script>
<script src="/js/react/react-dom.development.js" crossorigin></script>--}}
@endif
@if($rota=='mapa')
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
    function fonte(e){

        var elemento = $(".acessibilidade");
        var fonte = elemento.css('font-size');
        if (e == 'a') {
            console.log('a');
            elemento.css("fontSize", parseInt(fonte) + 2);
        }
        if(e == 'd'){
            console.log('d');
            elemento.css("fontSize", parseInt(fonte) - 2);
        }
        if(e == 'p'){
            console.log('p');
            elemento.css("fontSize", 16);
        }

        console.log(fonte);
    }
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
