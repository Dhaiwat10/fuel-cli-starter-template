import { useEffect, useState } from 'react';
import { Provider, Wallet } from 'fuels';

export const useProvider = (): [Provider | undefined, boolean] => {
  const [provider, setProvider] = useState<Provider>();
  const [loading, setLoading] = useState(true);

  new Wallet()

  useEffect(() => {
    (async () => {
      const provider = await Provider.create(
        'https://beta-4.fuel.network/graphql'
      );
      setProvider(provider);
      setLoading(false);
    })();
  }, []);

  return [provider, loading];
};
