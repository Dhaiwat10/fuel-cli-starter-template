import { useEffect, useState } from 'react';
import { useFuel } from './useFuel';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [fuel] = useFuel();

  useEffect(() => {
    (async () => {
      if (fuel) {
        const accounts = await fuel.accounts();
        setAccounts(accounts);
      }
    })();
  }, [fuel]);

  return accounts;
};
