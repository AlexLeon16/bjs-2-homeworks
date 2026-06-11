

function cachingDecoratorNew(func) {
  const cache = [];

  return function (...args) {
    const hash = md5(args);

    const cacheItem = cache.find(function (item) {
      return item.hash === hash;
    });

    if (cacheItem) {
      console.log("Из кеша: " + cacheItem.value);
      return "Из кеша: " + cacheItem.value;
    }

    const result = func(...args);

    cache.push({
      hash,
      value: result,
    });

    if (cache.length > 5) {
      cache.shift();
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  };
}

function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  let isFirstCall = true;

  function wrapper(...args) {
    wrapper.allCount += 1;

    if (isFirstCall) {
      isFirstCall = false;
      wrapper.count += 1;
      func(...args);
      return;
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      wrapper.count += 1;
      func(...args);
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}