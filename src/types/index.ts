export type ResponseCurrency = {
  data: {
    [key: string]: number;
  };
  query: {
    base_currency: string;
  };
};

export type CurrencyList = {
  currency: string;
  value?: number;
  id: string;
};
