import dayjs from 'dayjs';

/**
 * @param {dayjs.ConfigType} value
 * @returns {string}
 */
function formatDate(value) {
  return dayjs(value).format('MMM D');
}

/**
 * @param {dayjs.ConfigType} value
 * @returns {string}
 */
function formatTime(value) {
  return dayjs(value).format('HH:mm');
}
// console.log(formatTime('2023-03-18T13:00Z'));

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {string}
 */
function html(strings, ...values) {
  return strings.reduce((before, after, index) => {
    const value = values[index - 1];

    if (value === undefined) {
      return before + after;
    }

    if (Array.isArray(value)) {
      return before + value.join('') + after;
    }

    return before + value + after;
  });
}

export {
  formatDate,
  formatTime,
  html,
};
