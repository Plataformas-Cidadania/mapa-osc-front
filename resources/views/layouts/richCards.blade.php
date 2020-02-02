<script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "http://<?php echo $_SERVER['HTTP_HOST'];?>",
      "logo": "http://<?php echo $_SERVER['HTTP_HOST'];?>@yield('image')",
      "image": "http://<?php echo $_SERVER['HTTP_HOST'];?>@yield('image')",
      "description": "@yield('description')",
      "address":{
        "@type":"PostalAddress",
        "streetAddress":"{{$address->endereco}} {{$address->numero}} {{$address->complemento}} {{$address->bairro}}",
        "addressLocality":"{{$address->cidade}}",
        "addressRegion":"{{$address->estado}}",
        "postalCode":"{{$address->cep}}",
        "addressCountry":"BR"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "{{$address->telefone}}",
        "contactType": "customer service"
      },{
        "@type": "ContactPoint",
        "telephone": "{{$address->telefone2}}",
        "contactType": "customer service"
      }],
      "sameAs": [
        "{{$setting->facebook}}"
      ]

    }
</script>