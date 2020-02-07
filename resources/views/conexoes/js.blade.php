<?php $rota = Route::getCurrentRoute()->uri();?>

<script src="/js/app.js"></script>

@if($rota!='/')
    <script src="/js/react/react.development.js" crossorigin></script>
    <script src="/js/react/react-dom.development.js" crossorigin></script>
@endif