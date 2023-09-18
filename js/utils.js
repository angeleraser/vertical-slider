export function debounce(fn, delay = 300) {
  let timeout;

  return function debounced() {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}
