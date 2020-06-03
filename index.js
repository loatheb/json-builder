/* eslint-disable no-param-reassign */
module.exports = function createJSON() {
  let id = 0;

  function normalize(target, result = {}) {
    const { value } = target;

    function normailizeDFS(children, refrenceObj) {
      if (!children.length) return;

      children.forEach((child) => {
        normalize(child, refrenceObj);
      });
    }

    if (!value) return normailizeDFS(target.children);

    let curr = result;

    if (typeof value === "string") {
      curr = { ...result[value] };
      result[value] = curr;
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([key, targetValue]) => {
        if (Object.hasOwnProperty.call(result, key)) {
          const prev = result[key];
          if (Array.isArray(prev)) {
            prev.push(targetValue);
          } else {
            result[key] = [prev, targetValue];
          }
        } else {
          result[key] = targetValue;
        }
      });
    }

    normailizeDFS(target.children, curr);
    return result;
  }

  function denormalize(defaultValue) {
    function proxyFunc(value) {
      proxyFunc.value = { [proxyFunc.value]: value };
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return proxyConfigFactory(proxyFunc);
    }

    // eslint-disable-next-line no-plusplus
    proxyFunc.id = id++;
    proxyFunc.value = defaultValue;
    proxyFunc.parent = null;
    proxyFunc.children = [];
    return proxyFunc;
  }

  function proxyConfigFactory(initTarget) {
    return new Proxy(initTarget, {
      get(target, key) {
        if (key === "toJSON") {
          return () => normalize(target);
        }

        const config = denormalize();
        config.value = key;
        config.parent = target;
        target.children.push(config);

        return proxyConfigFactory(config);
      },
    });
  }

  return proxyConfigFactory(denormalize({}));
};
