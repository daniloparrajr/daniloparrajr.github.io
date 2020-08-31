import Swiper, { Pagination, Lazy } from 'swiper';

// configure Swiper to use modules
Swiper.use([Pagination, Lazy]);

// init Swiper:
const mySwiper = new Swiper('.swiper-container', {
  lazy: true,
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  }
});