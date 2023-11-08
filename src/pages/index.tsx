import { Connect } from '@/components/Connect';
import { Inter } from 'next/font/google';
import contractIds from '@/sway-api/contract-ids.json';
import { TestContractAbi, TestContractAbi__factory } from '@/sway-api';
import { useEffect, useState } from 'react';
import { Contract, Provider } from 'fuels';
import { useAccount, useFuel } from '@fuel-wallet/react';

const inter = Inter({ subsets: ['latin'] });
const contractId = contractIds.testContract;

export default function Home() {
  const [contract, setContract] = useState<TestContractAbi>();
  const { account } = useAccount();
  const { fuel } = useFuel();
  const [returnedValue, setReturnedValue] = useState<boolean>();

  useEffect(() => {
    (async () => {
      if (account && fuel) {
        const wallet = await fuel?.getWallet(account as string);
        const contract = TestContractAbi__factory.connect(contractId, wallet!);
        setContract(contract);
      }
    })();
  }, [account, fuel]);

  const onTestFunctionCalled = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }
    const { value } = await contract.functions.test_function().call();
    setReturnedValue(value);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <Connect />

      <hr className='border border-slate-200 w-8/12 my-6' />

      <h3>Contract ID: {contractId}</h3>

      <button onClick={onTestFunctionCalled}>Call `test_function`</button>

      {returnedValue && <p>Returned value: {returnedValue.toString()}</p>}
    </main>
  );
}
