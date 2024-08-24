new Swiper("#swiper-1", {
  effect: "slide",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 700,
  lazyLoadin: true,
  allowTouchMove: false,
});


