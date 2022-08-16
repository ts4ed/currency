import React from 'react';

const defaultCurrencies = ['UAH', 'USD', 'EUR'];

export const Header = () => {
  const ratesRef = React.useRef({});
  const UAH = ((ratesRef.current.UAH / ratesRef.current.UAH) * 100).toFixed(0);
  const USD = ((ratesRef.current.UAH / ratesRef.current.USD) * 100).toFixed(2);
  const EUR = ((ratesRef.current.UAH / ratesRef.current.EUR) * 100).toFixed(2);
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
  return (
    <>
      <div className="header">
        <ul className="currenc">
          {defaultCurrencies.map(cur => (
            <li key={cur}>{cur}</li>
          ))}
        </ul>
        <ul className="currenc">
          <li>{UAH}</li>
          <li>{USD}</li>
          <li>{EUR}</li>
        </ul>
      </div>
    </>
  );
};
