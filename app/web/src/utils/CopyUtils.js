class CopyUtils {
  static deepFreeze(object) {
    Object.freeze(object);
    if (object === undefined) {
      return object;
    }

    Object.getOwnPropertyNames(object).forEach(function (prop) {
      if (object[prop] !== null
        && (typeof object[prop] === "object" || typeof object[prop] === "function")
        && !Object.isFrozen(object[prop])) {
        CopyUtils.deepFreeze(object[prop]);
      }
    });

    return object;
  };
}

export default CopyUtils;