import { load } from '@shopify/theme-sections';

import '../sections/product';

require('./customers/login');
require('./customers/addresses');

load('*');
