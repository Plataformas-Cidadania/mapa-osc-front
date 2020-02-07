<meta name="keywords" content="@yield('keywords')"/>
<meta name="description" content="@yield('description')">
<meta name="author" content="{{$setting->titulo}}">

<meta property="og:url" content="{{request()->fullUrl()}}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{{$setting->titulo}} - @yield('title')" />
<meta property="og:description" content="@yield('description')" />
<meta property="og:image" content="http://<?php echo $_SERVER['HTTP_HOST'];?>@yield('image')" />