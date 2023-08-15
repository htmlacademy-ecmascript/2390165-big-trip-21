import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';

dayjs.extend(durationPlugin);

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

/**
 * @param {dayjs.ConfigType} valueFrom
 * @param {dayjs.ConfigType} valueTo
 * @returns {string}
 */
function formatDuration(valueFrom, valueTo) {
  const ms = dayjs(valueTo).diff(valueFrom);
  const duration = dayjs.duration(ms);

  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}


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
  formatDuration,
  html,
};
