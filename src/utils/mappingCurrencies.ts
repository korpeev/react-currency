import { ResponseCurrency, CurrencyList } from '../types';
import { v4 as uuid } from 'uuid';
export default (collection: ResponseCurrency) => {
  const mappedData = Object.entries(collection.data).map(([key, value]) => ({
    currency: key,
    value,
    id: uuid(),
  }));
  return mappedData;
};
