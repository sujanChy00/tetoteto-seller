export const formatCurrency = (amount: number) => {
  if (amount > 1000) {
    return (amount / 1000).toFixed(1) + "k";
  }
  if (amount > 1000000) {
    return (amount / 1000000).toFixed(1) + "M";
  }
  return amount.toLocaleString();
};
