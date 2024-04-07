class StringUtils {
  static truncateStr(str, length) {
    if (str.length >= length) {
      return str.substring(0, length) + "...";
    }
    return str;
  }

  static async replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, (full, ...args) => {
      promises.push(asyncFn(full, ...args));
      return full;
    });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
  }
}

export default StringUtils;