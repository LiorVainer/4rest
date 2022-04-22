/**
 * @param mainValue - Main Value
 * @param fallbackValue - Fallback Value
 * @returns main value if not undefined, else fallback value
 */
export const fallback = (mainValue: any, fallbackValue: any): any => (mainValue ? mainValue : fallbackValue);
