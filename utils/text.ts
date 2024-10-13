
/**
 * Capitilizes first letter in a string, does not respect punctuation and only changes the first letter given.
 * @param {string} string
 * @returns {string}
 */
export function capitilize(string: string):string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Removes all use of space in a string and returns the result
 * @param {string} string string to modify
 * @returns {string} new string without any spaces
 */
export function removeWhitespace(string: string):string {
  return string.replace(/\s/g, '');
}

/**
 * Replaces all occourances of spaces with given character
 * @param {string} string string to modify
 * @param {string} val replaces space
 * @returns {string} new string with spaces replaced
 */
export function convertWhitespace(string: string, val: string):string {
  return string.replace(/\s/g, val);
}