
/**
 * Format number example: 120,000,500
 * @param value
 * @returns {string}
 */
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