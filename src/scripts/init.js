$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    $(".shrink-button").on("click", function(){
        let nav = $("nav.main-nav");
        let body = $("div.main-container");
        if(nav.width() > window.innerWidth / 10){
            nav.width("7%");
            body.width("93%");
            nav.addClass("shrink")
        }else{
            nav.width("20%");
            body.width("80%");
            nav.removeClass("shrink")
        }
    });
});