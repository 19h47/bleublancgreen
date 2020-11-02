/* global Wishlist */
import Flickity from 'flickity';

require('./wishlist');
require('./templates');

(() => {
	Wishlist.init();

	const carousels = [...document.querySelectorAll('.js-carousel')];

	carousels.forEach($carousel => {
		const $items = $carousel.querySelector('.js-items');
		const carousel = new Flickity($items, { setGallerySize: false }); // eslint-disable-line no-unused-vars
	});
})();
