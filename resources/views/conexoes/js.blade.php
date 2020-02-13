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
