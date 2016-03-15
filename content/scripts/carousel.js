var animationDuration = 0.5;
function updateSelector() {
    var selector = $(".carousel-selector");
    selector.css("transition", "background-color " + animationDuration + "s linear");
    selector.css("background-color", $(".carousel .active").css("background-color"));
}

var carouselInterval;
function resetInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(function() {
        $(".carousel .forward").first().click();
    }, 10000);
}

function moveCarouselTo(next, reverse) {
    var carousel = $(".carousel");
    var current = carousel.find(".active");

    current.removeClass("active");
    next.addClass("active");

    var forwardBackward = reverse ? "backward" : "forward";
    current.css("animation", "carousel-out-" + forwardBackward + " " + animationDuration + "s forwards linear 1");
    next.css("animation", "carousel-in-" + forwardBackward + " " + animationDuration + "s forwards linear 1");
    updateSelector();
    resetInterval();
}

$(".carousel .forward").click(function() {
    var current = $(this).closest(".carousel").find(".active");
    var next = current.next("article");

    if (next.length <= 0 || next === current) {
        next = $(".carousel").find("article").first();
    }

    moveCarouselTo(next, false);
});

$(".carousel .back").click(function() {
    var current = $(this).closest(".carousel").find(".active");
    var next = current.prev("article");

    if (next.length <= 0 || next === current) {
        next = $(".carousel").find("article").last();
    }

    moveCarouselTo(next, true);
});

$(".carousel-selector li").click(function() {
    var next = $(".carousel").find("." + $(this).attr("class"));
    var reverse = next.index() - $(".carousel .active").index() < 0;
    moveCarouselTo(next, reverse);
});