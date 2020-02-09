var owl = $('.owl-carousel');
owl.owlCarousel({
    lazyLoad:true,
    loop: true,
    margin: 10,
    nav: true,
    navText: ["<i class='fas fa-chevron-circle-left fa-4x'></i>","<i class='fas fa-chevron-circle-right fa-4x'></i>"],
    autoplay:true,
    autoplayTimeout:5000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    },
    items:1
});
