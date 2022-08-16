import React from 'react';
import { Block } from './Block';
import '../index.scss';
import { Header } from './Header';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then(res => res.json())
      .then(json => {
        ratesRef.current = json.rates;
      })
      .catch(err => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
  }, []);

  const onChangeFromPrice = value => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  };
  const onChangeToPrice = value => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);

    // eslint-disable-next-line
  }, [fromCurrency, fromPrice]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);

    // eslint-disable-next-line
  }, [toCurrency, toPrice]);

  return (
    <div>
      {ratesRef && (
        <>
          <Header />
          <div className="App">
            <Block
              value={fromPrice}
              currency={fromCurrency}
              onChangeCurrency={setFromCurrency}
              onChangeValue={onChangeFromPrice}
            />
            <Block
              value={toPrice}
              currency={toCurrency}
              onChangeCurrency={setToCurrency}
              onChangeValue={onChangeToPrice}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
