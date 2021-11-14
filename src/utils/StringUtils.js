/**
 * Format number example: 120,000,500
 * @param value
 * @returns {string}
 */
import moment from 'moment';

export function formatNumber(value) {
  if (!value) {
    return '0';
  }

  value = parseInt(value);
  value = Number(value)
    .valueOf()
    .toString();
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format date time from unix string value
 * @param unixTime
 * @param format
 * @returns {string}
 */
export const formatDateTimeFromUnix = (unixTime, format) => {
  return moment.unix(Number(unixTime)).format(format ? format : "LLLL")
};