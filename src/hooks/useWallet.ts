import { useEffect, useState } from 'react';
import { useAccounts } from './useAccounts';
import { useFuel } from './useFuel';
import { FuelWalletLocked } from '@fuel-wallet/sdk';

export const useWallet = () => {
  const [account] = useAccounts();
  const [fuel] = useFuel();
  const [wallet, setWallet] = useState<FuelWalletLocked>();

  useEffect(() => {
    (async () => {
      if (fuel && account) {
        const wallet = await fuel.getWallet(account);
        setWallet(wallet);
      }
    })();
  }, [account, fuel]);

  return [wallet];
};
