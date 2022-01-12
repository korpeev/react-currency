import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import api from './api';
import './App.scss';
import AppConverter from './components/AppConverter/AppConverter';
import CurrentCurrencies from './components/CurrentCurrencies/CurrentCurrencies';
import { CurrencyList } from './types';
import mappingCurrencies from './utils/mappingCurrencies';

function App() {
  const [currencyList, setCurrencyList] = useState<CurrencyList[]>([]);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [isLodaing, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .fetchCurrencies()
      .then((response) => {
        const currencies = mappingCurrencies(response);
        setCurrencyList(currencies);
        setBaseCurrency(response.query.base_currency);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='container'>
      <div className='wrapper'>
        {isLodaing ? (
          <h1>Идет Загрузка...</h1>
        ) : (
          <>
            <div className='app__title'>
              <h1>React Currency Converter</h1>
            </div>
            <AppConverter
              setCurrencyList={setCurrencyList}
              currencyList={currencyList}
              baseCurrency={baseCurrency}
              setBaseCurrency={setBaseCurrency}
            />
            <CurrentCurrencies
              currencyList={currencyList}
              basicCurrency={baseCurrency}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
