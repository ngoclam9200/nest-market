export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const removeNonNumeric = (value: string) => {
  return value.replace(/\D/g, "");
};
