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
@if($rota=='indicadores')
<script src="js/chart.js"></script>
<script src="js/charts/mixed.js"></script>
@endif

@if($rota=='mapa')
<script src="js/leaflet.js"></script>
<script src="js/components/maps/mapTeste.js"></script>
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
<script>
    $(document).ready(function() {
        $('.fa-chevron-left').hide();

        $('.btn-right').click(function() {
            $('.box-floating').hide();
        });

        $('.btn-menu-txt').click(function() {
            $('.menu-icons-txt').hide();
            $('.fa-chevron-right').hide();
            $('.fa-chevron-left').show();
            $('.box-floating').css('width', '80px');
            $('.menu-icons li').css('border', '0');
        });

        $('.btn-menu-txt-show').click(function() {
            $('.menu-icons-txt').show();
            $('.fa-chevron-right').show();
            $('.fa-chevron-left').hide();
            $('.box-floating').css('width', '300px');
            $('.menu-icons li').css('border-bottom', 'solid 1px #CCCCCC');
        });

    });
</script>


<!--///////////////////////////////REACT////////////////////////////-->
@if($rota=="contato")
    <script src="/js/components/forms/contact.js"></script>
    <script src="/js/utils.js"></script>
    <script src="/js/leaflet.js"></script>
    <script src="/js/components/maps/address.js"></script>
@endif
@if($rota=="artigo/{id}/{titulo}")
    <script src="/js/components/forms/comment.js"></script>
    <script src="/js/utils.js"></script>
@endif

@if($rota=="artigos" || $rota=="artigos/{id_segment}" || $rota=="artigos/{titulo}" || $rota=="artigos/{parameters}")
    <script src="/js/components/posts/search.js"></script>
    <script src="/js/components/posts/filterCategories.js"></script>
    <script src="/js/components/posts/filterMembers.js"></script>
    <script src="/js/components/posts/filterArchives.js"></script>
    <script src="/js/components/posts/filters.js"></script>
    <script src="/js/components/posts/list.js"></script>
    <script src="/js/utils.js"></script>
@endif


