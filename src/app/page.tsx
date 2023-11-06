'use client';

import { testContract as contractId } from '@/sway-api/contract-ids.json';
import { Provider } from 'fuels';
import { useEffect } from 'react';
import { TestContractAbi__factory } from '@/sway-api';

export default function Home() {
  useEffect(() => {
    (async () => {
      const provider = await Provider.create('http://127.0.0.1:4000/graphql');
      const contract = TestContractAbi__factory.connect(contractId, provider);
      console.log({
        contract,
      });
    })();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>create-fuels template</h1>
    </main>
  );
}
