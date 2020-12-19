import Flickity from 'flickity';

require('./layout/theme');
require('./wishlist');
require('./templates');

(() => {
	const carousels = [...document.querySelectorAll('.js-carousel')];

	carousels.forEach($carousel => {
		const $items = $carousel.querySelector('.js-items');
		const carousel = new Flickity($items, { setGallerySize: false }); // eslint-disable-line no-unused-vars
	});
})();
