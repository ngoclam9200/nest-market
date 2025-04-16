import moment from "moment";

export const formatDate = (
  dateInput: Date | string,
  dateFormat: string
): string => {
  return moment(dateInput).format(dateFormat);
};
