import React, { FC } from 'react';
import { CurrencyList } from '../../types';
import './CurrentCurrencies.scss';
interface CurrentCurrenciesProps {
  currencyList: CurrencyList[];
  basicCurrency: string;
}
const CurrentCurrencies: FC<CurrentCurrenciesProps> = ({
  currencyList,
  basicCurrency,
}) => {
  const list = ['USD', 'EUR', 'RUB'];
  const filteredList = currencyList.filter((c) => {
    return list.includes(c.currency) && basicCurrency !== c.currency;
  });

  return (
    <div className='currency'>
      <div className='currency__title'>
        <h1>Current Currencies</h1>
      </div>
      <div className='currencies'>
        <ol>
          {filteredList.map((l) => (
            <li key={l.id}>
              {' '}
              <strong>1</strong>{' '}
              <img
                src={`https://flagcdn.com/${basicCurrency
                  .toLowerCase()
                  .slice(0, -1)}.svg`}
                width={25}
              />{' '}
              {basicCurrency} = {l.currency}{' '}
              <img
                src={`https://flagcdn.com/${l.currency
                  .toLowerCase()
                  .slice(0, -1)}.svg`}
                width={25}
              />{' '}
              <strong>{l.value}</strong>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CurrentCurrencies;
