import { useState, useEffect } from 'react';

export function useMarketData() {
  // the endpoint is controlled by Tokemak Labs
  const url = 'https://tokemakmarketdata.s3.amazonaws.com/current.json';
  const [marketData, setMarketData] = useState({ toke: 0 });

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        if (result && result.prices) {
          setMarketData({ toke: result.prices.toke });
        }
      }, (err) => console.error(err));
  }, []);

  return { data: marketData };
}
