var animationDuration = 0.5;
$(".carousel .forward").click(function() {
    var carousel = $(this).closest(".carousel");
    var current = carousel.find(".active");
    var next = current.next("article");
    if (next.length <= 0 || next === current) {
        next = carousel.find("article").first();
    }

    current.removeClass("active");
    next.addClass("active");

    current.css("animation", "carousel-out-forward " + animationDuration + "s forwards linear 1");
    next.css("animation", "carousel-in-forward " + animationDuration + "s forwards linear 1");
});

$(".carousel .back").click(function() {
    var carousel = $(this).closest(".carousel");
    var current = carousel.find(".active");
    var next = current.prev("article");
    if (next.length <= 0 || next === current) {
        next = carousel.find("article").last();
    }

    current.removeClass("active");
    next.addClass("active");

    current.css("animation", "carousel-out-backward " + animationDuration + "s forwards linear 1");
    next.css("animation", "carousel-in-backward " + animationDuration + "s forwards linear 1");
});