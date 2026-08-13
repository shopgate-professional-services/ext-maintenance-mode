/**
 * Checks if a page is covered by the configured page whitelist. An entry matches
 * when it occurs within the route pattern of the current page (e.g. "/item" for
 * "/item/:productId") or within the path of the current page (e.g.
 * "/category/373036"). An empty whitelist covers every page.
 * @param {Array} whitelist The configured page whitelist.
 * @param {Object} [currentRoute] The current route.
 * @returns {boolean}
 */
const isPageWhitelisted = (whitelist, currentRoute) => {
  if (!whitelist || !whitelist.length) {
    return true;
  }

  const { pattern, pathname } = currentRoute || {};

  return whitelist.some(element => (pattern || '').includes(element) ||
    (pathname || '').includes(element));
};

export default isPageWhitelisted;
