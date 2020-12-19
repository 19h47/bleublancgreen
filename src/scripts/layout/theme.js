import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';
// import { cookiesEnabled } from '@shopify/theme-cart';

const cookiesEnabled = () => {
	let { cookieEnabled } = navigator;

	if (!cookieEnabled) {
		document.cookie = 'testcookie';
		cookieEnabled = -1 !== document.cookie.indexOf('testcookie');
	}
	return cookieEnabled;
}

require('../../styles/theme.scss');
// import '../../styles/theme.scss.liquid';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
	document.documentElement.className = document.documentElement.className.replace(
		'supports-no-cookies',
		'supports-cookies',
	);
}
