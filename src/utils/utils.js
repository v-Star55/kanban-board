// Utility helpers shared across modules

/**
 * Create an element with optional properties and children.
 * @param {string} tagName
 * @param {Object} [props]
 * @param {Array<Node|string>} [children]
 * @returns {HTMLElement}
 */
export function createElement(tagName, props = {}, children = []) {
  const el = document.createElement(tagName);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => { el.dataset[k] = v; });
    } else if (key in el) {
      el[key] = value;
    } else {
      el.setAttribute(key, value);
    }
  });
  for (const child of [].concat(children)) {
    if (child == null) continue;
    el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return el;
}

/**
 * Generate a simple unique id.
 * @returns {string}
 */
export function uid() {
  const rnd = Math.random().toString(36).slice(2, 8);
  const ts = Date.now().toString(36);
  return `${ts}-${rnd}`;
}

/**
 * Throttle function calls to at most once per wait ms.
 * @param {Function} fn
 * @param {number} wait
 */
export function throttle(fn, wait) {
  let last = 0;
  let timer = null;
  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}


