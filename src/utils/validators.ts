export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};

export const isValidPrice = (price: string | number): boolean => {
  const num = parseFloat(String(price));
  return !isNaN(num) && num > 0;
};

export const isValidAmount = (amount: string | number): boolean => {
  const num = parseFloat(String(amount));
  return !isNaN(num) && num >= 0; // Amount can be 0 for some order types
};

export const isRequired = (
  value: string | number | boolean | object | null | undefined
): boolean => {
  if (value === null || typeof value === "undefined") {
    return false;
  }
  if (typeof value === "string" && value.trim() === "") {
    return false;
  }
  return true;
};

