import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import api from '../../api';
import { CurrencyList } from '../../types';
import mappingCurrencies from '../../utils/mappingCurrencies';
import './AppConverter.scss';
import { v4 as uuid } from 'uuid';
type InputType = {
  from: string;
  to: string;
};

interface AppConverterProps {
  currencyList: CurrencyList[];
  baseCurrency: string;
  setCurrencyList: (list: CurrencyList[]) => void;
  setBaseCurrency: (baseCurrency: string) => void;
}
const AppConverter: FC<AppConverterProps> = ({
  currencyList,
  baseCurrency,
  setCurrencyList,
  setBaseCurrency,
}) => {
  const [input, setInput] = useState<InputType>({
    from: '',
    to: '',
  });
  const [currencyFrom, setCurencyFrom] = useState(baseCurrency);
  const [currencyTo, setCurrencyTo] = useState('KZT');

  const handleSelectFromCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurencyFrom(e.target.value);
    setInput((prev) => ({ ...prev, from: '' }));
    api.fetchCurrencyByValue(e.target.value).then((response) => {
      const currencies = mappingCurrencies(response);
      setCurrencyList([
        { currency: response.query.base_currency, id: uuid() },
        ...currencies,
      ]);
      setBaseCurrency(response.query.base_currency);
    });
  };
  const toValue = useMemo(
    () =>
      currencyList.find((c) => c.currency === currencyTo)?.value?.toFixed(2),
    [currencyFrom, currencyList, currencyTo]
  );
  console.log(toValue);
  const handleSelectToCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrencyTo(e.target.value);
    setInput((prev) => ({ ...prev, to: '' }));
  };
  const convertCurrency = () => {
    const fromValue = Number(input.from);
    if (toValue) {
      const converted = Number(fromValue * +toValue);
      setInput((prev) => ({ ...prev, to: converted.toFixed(2) }));
    }
    if (!input.from.length) {
      setInput((prev) => ({ ...prev, to: '' }));
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, from: e.target.value }));
  };
  useEffect(() => {
    convertCurrency();
  }, [input.from, currencyList, toValue, currencyTo]);
  const renderOptions = () => {
    return currencyList.map(({ currency, id }) => (
      <option key={id} value={currency}>
        {currency}
      </option>
    ));
  };
  return (
    <div className='app__converter'>
      <div className='app__converter_input'>
        <div className='app__converter_textfield'>
          <select value={currencyFrom} onChange={handleSelectFromCurrency}>
            <option disabled>Chose you`r currency</option>
            {renderOptions()}
          </select>
          <input
            onChange={handleOnChange}
            value={input.from}
            name='from'
            type='text'
          />
        </div>

        <span className='app__converter_rotate'>=</span>
        <div className='app__converter_textfield'>
          <select value={currencyTo} onChange={handleSelectToCurrency}>
            <option disabled>Chose you`r currency</option>
            {renderOptions()}
          </select>
          <input readOnly defaultValue={input.to} name='to' type='text' />
        </div>
      </div>
      <div className='app__converted'>
        <strong> Converted:</strong>
        <div className='app__converted_text'>
          <img
            src={`https://flagcdn.com/${currencyFrom
              .toLowerCase()
              .slice(0, -1)}.svg`}
            width='25'
            alt='South Africa'
          />
          <span>
            {input.from.length > 0
              ? `${input.from} ${currencyFrom}`
              : `1 ${currencyFrom}`}
          </span>
        </div>
        =
        <div className='app__converted_text'>
          <img
            src={`https://flagcdn.com/${currencyTo
              .toLowerCase()
              .slice(0, -1)}.svg`}
            width='25'
            alt='South Africa'
          />
          <span>
            {input.from.length > 0
              ? `${input.to} ${currencyTo}`
              : `${toValue} ${currencyTo}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppConverter;
