<?php
$base_href = config('app.url');
?>
<!-- jQuery -->
{!! Html::script($base_href.'assets-cms/lib/jquery/jquery.min.js') !!}
<!-- Angular -->
{!! Html::script($base_href.'assets-cms/lib/angular/angular.min.js') !!}
{{--{!! Html::script($base_href.'/cms/angular/animate.min.js') !!}--}}
{{--{!! Html::script($base_href.'/cms/angular/messages.min.js') !!}--}}
{!! Html::script($base_href.'assets-cms/lib/angular/pagination.js') !!}
{!! Html::script($base_href.'assets-cms/lib/angular/ui-bootstrap-tpls-1.1.2.min.js') !!}
{!! Html::script($base_href.'assets-cms/lib/angular/ng-file-upload.min.js') !!}
{!! Html::script($base_href.'assets-cms/lib/angular/ng-file-upload-shim.min.js') !!}

<!-- CMS -->
{!! Html::script($base_href.'assets-cms/js/cms.js') !!}
{!! Html::script($base_href.'assets-cms/js/directives/initModel.js') !!}
{!! Html::script($base_href.'assets-cms/js/utils.js') !!}

{{-- {!! Html::script($base_href.'assets-cms/tinymce/js/tinymce/tinymce.min.js') !!}--}}
{!! Html::script($base_href.'assets-cms/lib/angular/tinymce.min.js') !!}
{!! Html::script($base_href.'assets-cms/js/tiny.js') !!}
{!! Html::script($base_href.'assets-cms/lib/angular/ui-tinymce.min.js') !!}



<!-- Bootstrap Core JavaScript -->
{!! Html::script($base_href.'/assets-cms/lib/bootstrap/js/bootstrap.min.js') !!}


<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<![endif]-->
{{--<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>--}}


<script src="/js/lib/html5shiv.min.js"></script>
<script src="/js/lib/respond.min.js"></script>

