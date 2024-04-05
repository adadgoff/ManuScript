class StringUtils {
  static truncateStr = (str, length) => {
    if (str.length >= length) {
      return str.substring(0, length) + "...";
    }
    return str;
  }

}

export default StringUtils;