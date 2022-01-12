import { ResponseCurrency } from '../types';

export default new (class Api {
  static baseUrl =
    'https://freecurrencyapi.net/api/v2/latest?apikey=d3f47060-73c7-11ec-b006-8d814dbefff5';

  private request(query = 'USD'): Promise<ResponseCurrency> {
    return fetch(`${Api.baseUrl}&base_currency=${query}`)
      .then((res) => res.json())
      .then((data) => data);
  }

  async fetchCurrencyByValue(currency: string): Promise<ResponseCurrency> {
    const response = await this.request(currency);
    return response;
  }
  async fetchCurrencies(): Promise<ResponseCurrency> {
    const response = await this.request();
    return response;
  }
})();
