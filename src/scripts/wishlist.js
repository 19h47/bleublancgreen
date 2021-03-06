/* global theme */
const LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
const LOCAL_STORAGE_DELIMITER = ',';
const BUTTON_ACTIVE_CLASS = 'active';

const selectors = {
	button: '[data-wishlist-button]',
	grid: '[data-wishlist-grid]',
	counter: '[data-wishlist-counter]',
	delete: '[data-wishlist-delete]',
};

const getWishlist = () => {
	const wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;

	if (wishlist) {
		return wishlist.split(LOCAL_STORAGE_DELIMITER);
	}

	return [];
};

const updateCounter = () => {
	const wishlist = getWishlist();
	const $counter = document.querySelector(selectors.counter);

	$counter.innerHTML = '';

	if (0 < wishlist.length) {
		$counter.innerHTML = wishlist.length;
	}
};

const wishlistContains = handle => -1 !== getWishlist().indexOf(handle);

const setWishlist = array => {
	const wishlist = array.join(LOCAL_STORAGE_DELIMITER);

	if (array.length) {
		localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
	} else {
		localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);
	}

	return wishlist;
};

const updateWishlist = handle => {
	const wishlist = getWishlist();
	const indexInWishlist = wishlist.indexOf(handle);

	if (-1 === indexInWishlist) {
		wishlist.push(handle);
	} else {
		wishlist.splice(indexInWishlist, 1);
	}

	return setWishlist(wishlist);
};

// const resetWishlist = () => setWishlist([]);

const setupButtons = buttons => {
	buttons.forEach($button => {
		const productHandle = $button.dataset.productHandle || false;

		if (!productHandle) {
			return console.error(
				'[Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.',
			);
		}

		if (wishlistContains(productHandle)) {
			$button.classList.add(BUTTON_ACTIVE_CLASS);
		}

		$button.addEventListener('click', () => {
			updateWishlist(productHandle);
			updateCounter();
			$button.classList.toggle(BUTTON_ACTIVE_CLASS);
			$button.innerHTML = theme.strings.addedToWishlist;
		});

		return true;
	});
};

const setupGrid = grid => {
	const wishlist = getWishlist();

	const requests = wishlist.map(handle => {
		const productTileTemplateUrl = `/products/${handle}?view=tease`;

		return fetch(productTileTemplateUrl).then(res => res.text());
	});

	Promise.all(requests)
		.then(responses => {
			const wishlistProductCards = responses.join('');
			const buttons = grid.querySelectorAll(selectors.button) || [];

			grid.innerHTML = wishlistProductCards;

			if (buttons.length) {
				setupButtons(buttons);
			}
		})
		.then(() => {
			if (0 === grid.innerHTML.length) {
				grid.innerHTML = `<div class="col-12"><p>${theme.strings.noProductsInWishlist}</p></div>`;
			}
		});
};

updateCounter();

document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll(selectors.button) || [];
	const grid = document.querySelector(selectors.grid) || false;

	if (buttons.length) {
		setupButtons(buttons);
	}

	if (grid) {
		setupGrid(grid);
	}
});

document.addEventListener(
	'click',
	({ target }) => {
		if (target.hasAttribute('data-wishlist-remove')) {
			const handle = target.getAttribute('data-product-handle');

			updateWishlist(handle);
			updateCounter();
			target.parentNode.remove();
		}
	},
	false,
);
