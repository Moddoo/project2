$(document).ready(function() {
    const sideNav = document.querySelector(".sidenav");
    const sign = $(".sign");
    const signUp = document.querySelectorAll('.modal');
    const carousel = document.querySelectorAll('.carousel');
    const parallax = document.querySelectorAll(".parallax");
    const tabs = document.querySelectorAll(".tabs");

    $(document).scroll(() => {
        if($(this).scrollTop() > 130) {
            $('.navy').css('height','45px');
            $('.nav-wrapper a, .sidenav-trigger').css({
                color: rgb(255, 213, 28),
                'text-shadow': 'none'
            });
        };
        if($(this).scrollTop() < 100) {
            $('.navy').css('height','0');
            $('.nav-wrapper a').css({
                color: 'rgb(255, 231, 188)',
                'text-shadow': '2px 2px 2px black'
            })
        };
    })
    setInterval(() => {
        sign.toggleClass('animated shake slow')
    }, 3000);
    new WOW().init();
    M.Sidenav.init(sideNav);
    M.Carousel.init(carousel);
    M.Parallax.init(parallax);
    M.Modal.init(signUp)
    M.Tabs.init(tabs);
    $('.wrap').ripples({
        dropRadius: 20,
        perturbance: 0.03,
        resolution: 1000
      });
})