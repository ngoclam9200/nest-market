export enum BooleanNumberEnum {
  TRUE = 1,
  FALSE = 0,
}

export enum GetTypeEnum {
  DELETED = 1,
  NOT_DELETED = 0,
  ALL = -1,
}

export const ORDER_STATUS_ENUM = {
  PENDING: 1,
  DELIVERING: 2,
  DELIVERED: 3,
  CANCEL: 4,
};

export const TRANSACTION_TYPE_ENUM = {
  COD: 1,
  PAYPAL: 2,
  VNPAY: 3,
};
