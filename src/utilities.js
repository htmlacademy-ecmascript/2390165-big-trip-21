import 'flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
import {escape} from 'he';

dayjs.extend(durationPlugin);

/**
 * @param {HTMLInputElement} inputFrom
 * @param {HTMLInputElement} inputTo
 * @returns {Function}
 */
function createCalendars(inputFrom, inputTo) {
  /**
   * @type {import('flatpickr/dist/types/options').Options}
   */
  const options = {
    dateFormat: 'Z',
    altInput: true,
    altFormat: 'd/m/y H:i',
    locale: {firstDayOfWeek: 1},
    enableTime: true,
    'time_24hr': true
  };


  const calendarFrom = flatpickr(inputFrom, options);
  const calendarTo = flatpickr(inputTo, options);

  calendarFrom.set('onChange', ([date]) => calendarTo.set('minDate', date));
  calendarTo.set('minDate', calendarFrom.selectedDates.at(0));


  return () => {
    calendarFrom.destroy();
    calendarTo.destroy();
  };
}

/**
 * @param {dayjs.ConfigType} valueFrom
 * @param {dayjs.ConfigType} valueTo
 * @returns {string}
 */
function formatDateRange(valueFrom, valueTo) {
  valueFrom = dayjs(valueFrom);
  valueTo = dayjs(valueTo);

  if (valueFrom.isSame(valueTo, 'day')) {
    return formatDate(valueFrom);
  }

  return [
    formatDate(valueFrom, valueFrom.isSame(valueTo, 'month')),
    formatDate(valueTo)
  ].join(' — ');
}

/**
 * @param {dayjs.ConfigType} value
 * @param {boolean} [isNarrow]
 * @returns {string}
 */
function formatDate(value, isNarrow) {
  return dayjs(value).format(isNarrow ? 'D' : 'D MMM');
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
 * @param {number} value
 * @returns {string}
 */
function formatNumber(value) {
  return value.toLocaleString('en');
}

/**
 * @param {Array<string>} items
 * @returns {string}
 */
function formatList(items) {
  items = structuredClone(items);

  if (items.length > 3) {
    items.splice(1, items.length - 2, '...');
  }
  return items.join(' — ');
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

/**
 * @param {any} data
 * @returns {any}
 */
function sanitize(data) {
  switch (data?.constructor) {
    case String:
      return escape(data);

    case Array:
      return data.map(sanitize);

    case Object:
      return Object.keys(data).reduce((copy, key) => {
        copy[key] = sanitize(data[key]);

        return copy;
      }, {});

    default:
      return data;
  }


}

export {
  createCalendars,
  formatDateRange,
  formatDate,
  formatTime,
  formatDuration,
  formatNumber,
  formatList,
  html,
  sanitize,
};
