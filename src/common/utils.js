export function debounce(fun, delay) {
  let timer = null;
  return function(...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, arg);
    }, delay);
  };
}
