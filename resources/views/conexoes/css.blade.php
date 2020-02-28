<link rel="stylesheet" href="css/app.css">

@if($rota=='/')
    <link rel="stylesheet" href="css/home.css">
@endif
@if($rota=='mapa')
    <link rel="stylesheet" href="css/map.css">
@endif
<style>
    .owl-nav{
        text-align: center;
    }
    .owl-prev, .owl-next{
        top: 40%;
        position: absolute;
        opacity: 0.05;
        transition: .3s;
    }
    .owl-prev:hover, .owl-next:hover{
        transform: scale(1.1);
        transition: .3s;
    }
    .owl-prev{
        left: 20px;
    }
    .owl-next{
        right: 20px;
    }
</style>
