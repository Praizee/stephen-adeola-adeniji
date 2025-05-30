export const formatCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (
  value: number,
  decimalPlaces: number = 2,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

export const formatPercentage = (
  value: number,
  decimalPlaces: number = 2,
  signed: boolean = true
): string => {
  const options: Intl.NumberFormatOptions = {
    style: "percent",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  };
  if (signed) {
    options.signDisplay = "always";
  }
  return new Intl.NumberFormat("en-US", options).format(value / 100);
};

export const formatTimestampToDate = (
  timestamp: number,
  locale: string = "en-US"
): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(locale);
};

// Add more formatters later as needed (e.g., for large numbers, time, etc.)

