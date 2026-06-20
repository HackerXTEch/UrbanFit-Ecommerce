// Currency utility - USD to INR conversion
const USD_TO_INR = 84;

/**
 * Convert a USD price to INR
 * @param {number} usdPrice
 * @returns {number}
 */
export const toINR = (usdPrice) => Math.round(usdPrice * USD_TO_INR);

/**
 * Format a USD price as INR string with ₹ symbol
 * @param {number} usdPrice
 * @returns {string}  e.g. "₹12,599"
 */
export const formatINR = (usdPrice) => {
  const inr = toINR(usdPrice);
  return `₹${inr.toLocaleString('en-IN')}`;
};
